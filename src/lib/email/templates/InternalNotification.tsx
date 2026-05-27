interface Field {
  label: string;
  value: string;
}

interface InternalNotificationProps {
  category: string;
  submittedAt: string;
  fields: Field[];
  message?: string;
}

export function generateInternalNotificationHtml({
  category,
  submittedAt,
  fields,
  message,
}: InternalNotificationProps): string {
  const fieldsHtml = fields
    .map(
      (f) => `
        <div style="margin-bottom: 14px;">
          <p style="color: #6b7280; font-size: 11px; letter-spacing: 1px; margin: 0; text-transform: uppercase; font-weight: 600;">
            ${f.label}
          </p>
          <p style="color: #0d0a2c; font-size: 14px; margin: 4px 0 0; font-weight: 500; white-space: pre-wrap;">
            ${f.value}
          </p>
        </div>
      `
    )
    .join("");

  const messageHtml = message
    ? `
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 18px 0;">
        <p style="color: #6b7280; font-size: 11px; letter-spacing: 1px; margin: 0; text-transform: uppercase; font-weight: 600;">
          Message
        </p>
        <p style="color: #0d0a2c; font-size: 14px; margin: 8px 0 0; line-height: 1.55; white-space: pre-wrap;">
          ${message}
        </p>
      `
    : "";

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { background: #f5f3ff; font-family: Inter, Helvetica, Arial, sans-serif; margin: 0; padding: 32px 0; }
          .container { background: #ffffff; border-radius: 16px; max-width: 560px; margin: 0 auto; overflow: hidden; }
          .header { background: #1800ad; padding: 28px 32px; }
          .header-label { color: #ffbd59; font-size: 11px; letter-spacing: 2px; margin: 0; text-transform: uppercase; font-weight: 700; }
          .header-title { color: #ffffff; font-size: 22px; margin: 8px 0 0; font-weight: 800; }
          .content { padding: 28px 32px; }
          .timestamp { color: #0d0a2c; font-size: 13px; margin: 0; }
          .divider { border: none; border-top: 1px solid #e5e7eb; margin: 18px 0; }
          .footer { color: #6b7280; font-size: 12px; margin: 0; line-height: 1.5; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <p class="header-label">ABZ Capital · New lead</p>
            <h1 class="header-title">${category}</h1>
          </div>
          <div class="content">
            <p class="timestamp">Received ${submittedAt}</p>
            <hr class="divider">
            ${fieldsHtml}
            ${messageHtml}
            <hr class="divider">
            <p class="footer">
              Submitted via abzcapital.co.ke. Reply to this email to respond to the applicant directly.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export default generateInternalNotificationHtml;
