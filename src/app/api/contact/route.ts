import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  to?: string;
};

type MailError = {
  code?: string;
  responseCode?: number;
  command?: string;
};

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

export async function POST(request: Request) {
  const body = (await request.json()) as ContactPayload;
  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const toEmail = process.env.CONTACT_TO_EMAIL || body.to;

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
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
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
