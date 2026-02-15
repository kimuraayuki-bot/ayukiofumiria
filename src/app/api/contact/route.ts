import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  to?: string;
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

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
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

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[/api/contact] send failed", error);
    return NextResponse.json({ error: "send_failed" }, { status: 500 });
  }
}
