import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
  startedAt?: unknown;
};

type MailError = {
  code?: string;
  responseCode?: number;
  command?: string;
};

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MIN_SUBMIT_INTERVAL_MS = 2 * 1000;
const MAX_FORM_AGE_MS = 2 * 60 * 60 * 1000;
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 320;
const MAX_MESSAGE_LENGTH = 5_000;
const MIN_MESSAGE_LENGTH = 5;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const requestLog = new Map<string, number[]>();

const classifyMailError = (error: MailError) => {
  if (error.code === "EAUTH" || error.responseCode === 535 || error.responseCode === 534) {
    return "send_failed_auth";
  }
  if (
    error.code === "ECONNECTION" ||
    error.code === "ETIMEDOUT" ||
    error.code === "ESOCKET" ||
    error.code === "ECONNREFUSED"
  ) {
    return "send_failed_connection";
  }
  return "send_failed";
};

const normalizeSingleLine = (value: unknown) =>
  typeof value === "string" ? value.replace(/[\r\n]+/g, " ").trim() : "";

const normalizeMessage = (value: unknown) =>
  typeof value === "string" ? value.replace(/\r\n?/g, "\n").replace(/\0/g, "").trim() : "";

const getClientIp = (request: Request) => {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "anonymous";
  }

  return request.headers.get("x-real-ip") ?? request.headers.get("cf-connecting-ip") ?? "anonymous";
};

const hasAllowedOrigin = (request: Request) => {
  const candidate = request.headers.get("origin") ?? request.headers.get("referer");

  if (!candidate) {
    return false;
  }

  try {
    const requestUrl = new URL(request.url);
    const candidateUrl = new URL(candidate);

    return candidateUrl.protocol === requestUrl.protocol && candidateUrl.host === requestUrl.host;
  } catch {
    return false;
  }
};

const pruneRateLimitEntries = (windowStart: number) => {
  for (const [key, timestamps] of requestLog.entries()) {
    const recent = timestamps.filter((timestamp) => timestamp >= windowStart);

    if (recent.length === 0) {
      requestLog.delete(key);
      continue;
    }

    requestLog.set(key, recent);
  }
};

const isRateLimited = (key: string, now: number) => {
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  if (requestLog.size > 500) {
    pruneRateLimitEntries(windowStart);
  }

  const recent = (requestLog.get(key) ?? []).filter((timestamp) => timestamp >= windowStart);
  recent.push(now);
  requestLog.set(key, recent);

  return recent.length > RATE_LIMIT_MAX_REQUESTS;
};

const parseRequestBody = async (request: Request) => {
  try {
    return (await request.json()) as ContactPayload;
  } catch {
    return null;
  }
};

export async function POST(request: Request) {
  if (!hasAllowedOrigin(request)) {
    return NextResponse.json({ error: "invalid_origin" }, { status: 403 });
  }

  const now = Date.now();
  const clientIp = getClientIp(request);

  if (isRateLimited(clientIp, now)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const body = await parseRequestBody(request);

  if (!body) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const name = normalizeSingleLine(body.name);
  const email = normalizeSingleLine(body.email).toLowerCase();
  const message = normalizeMessage(body.message);
  const website = normalizeSingleLine(body.website);
  const startedAt = typeof body.startedAt === "number" ? body.startedAt : Number(body.startedAt);
  const elapsedMs = now - startedAt;

  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (
    !Number.isFinite(startedAt) ||
    elapsedMs < MIN_SUBMIT_INTERVAL_MS ||
    elapsedMs > MAX_FORM_AGE_MS
  ) {
    return NextResponse.json({ error: "spam_detected" }, { status: 400 });
  }

  if (!name || !email || !message) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  if (
    name.length > MAX_NAME_LENGTH ||
    email.length > MAX_EMAIL_LENGTH ||
    message.length < MIN_MESSAGE_LENGTH ||
    message.length > MAX_MESSAGE_LENGTH ||
    !EMAIL_PATTERN.test(email)
  ) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!smtpHost || !smtpUser || !smtpPass || !toEmail) {
    const missing = [
      !smtpHost ? "SMTP_HOST" : null,
      !smtpUser ? "SMTP_USER" : null,
      !smtpPass ? "SMTP_PASS" : null,
      !toEmail ? "CONTACT_TO_EMAIL" : null,
    ].filter(Boolean);
    return NextResponse.json({ error: "mail_not_configured", missing }, { status: 500 });
  }

  const portCandidates = Array.from(new Set([smtpPort, smtpPort === 587 ? 465 : 587]));
  let lastError: MailError | null = null;

  for (const port of portCandidates) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port,
        secure: port === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"Portfolio Contact" <${smtpUser}>`,
        to: toEmail,
        replyTo: email,
        subject: `[Portfolio Contact] ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nIP: ${clientIp}\n\nMessage:\n${message}`,
      });

      return NextResponse.json({ ok: true, port });
    } catch (error) {
      const mailError = error as MailError;
      lastError = mailError;
      console.error("[/api/contact] send failed", {
        port,
        code: mailError.code,
        responseCode: mailError.responseCode,
        command: mailError.command,
      });
    }
  }

  const errorCode = classifyMailError(lastError ?? {});
  return NextResponse.json(
    {
      error: errorCode,
      attemptedPorts: portCandidates,
    },
    { status: 500 },
  );
}
