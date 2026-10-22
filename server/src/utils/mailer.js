import nodemailer from 'nodemailer';

export async function sendContactNotification({ name, email, subject, message, ip }) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const rawPass = process.env.SMTP_PASS;
  const pass = rawPass ? rawPass.replace(/["'\s]/g, '') : '';
  const targetEmail = process.env.NOTIFICATION_EMAIL || 'imranmeg2356@gmail.com';

  if (!host || !user || !pass) {
    console.log('[Mailer] SMTP not configured. Simulating email dispatch to:', targetEmail);
    console.log(`[Mailer Mock Alert] From: ${name} <${email}> | Message: ${message.slice(0, 80)}...`);
    return { delivered: false, simulated: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user, pass },
    });

    const info = await transporter.sendMail({
      from: `"toufikul.dev / status" <${user}>`,
      to: targetEmail,
      replyTo: email,
      subject: `[Portfolio Ping] ${name}: ${subject || 'New Message'}`,
      text: `New contact submission from toufikul.dev:\n\nName: ${name}\nEmail: ${email}\nIP: ${ip}\n\nMessage:\n${message}\n`,
      html: `
        <div style="font-family: monospace; background: #0d1216; color: #e4eaee; padding: 24px; border: 1px solid #263340;">
          <h2 style="color: #5cc8e6; margin-top: 0;">Incoming Telemetry: POST /contact</h2>
          <p><strong>Operator Alert:</strong> A new message was received from your portfolio status board.</p>
          <hr style="border: 0; border-top: 1px solid #263340; margin: 16px 0;" />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #5cc8e6;">${email}</a></p>
          <p><strong>IP:</strong> ${ip || 'unknown'}</p>
          <div style="background: #131a20; padding: 14px; border-left: 3px solid #5fd38d; margin-top: 14px;">
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    console.log('[Mailer] Message sent:', info.messageId);
    return { delivered: true, messageId: info.messageId };
  } catch (error) {
    console.error('[Mailer] Error sending email notification:', error.message);
    return { delivered: false, error: error.message };
  }
}
