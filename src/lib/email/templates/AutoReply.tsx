interface AutoReplyProps {
  name: string;
  category: string;
  intro?: string;
  whatsappUrl: string;
}

export function generateAutoReplyHtml({ name, category, intro, whatsappUrl }: AutoReplyProps): string {
  const firstName = name.trim().split(" ")[0] || "there";

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { background: #f5f3ff; font-family: Inter, Helvetica, Arial, sans-serif; margin: 0; padding: 32px 0; }
          .container { background: #ffffff; border-radius: 16px; max-width: 560px; margin: 0 auto; overflow: hidden; }
          .header { background: linear-gradient(135deg, #1800ad, #3a1ccc); padding: 32px; }
          .header-label { color: #ffbd59; font-size: 11px; letter-spacing: 2px; margin: 0; text-transform: uppercase; font-weight: 700; }
          .header-title { color: #ffffff; font-size: 22px; margin: 8px 0 0; font-weight: 800; line-height: 1.2; }
          .content { padding: 28px 32px; }
          .text { color: #0d0a2c; font-size: 15px; margin: 0; line-height: 1.6; }
          .text-margin { margin-top: 16px; }
          .button-container { text-align: center; margin: 24px 0 12px; }
          .button { background: #25d366; color: #ffffff; padding: 12px 24px; border-radius: 10px; font-size: 14px; font-weight: 600; text-decoration: none; display: inline-block; }
          .divider { border: none; border-top: 1px solid #e5e7eb; margin: 20px 0 16px; }
          .footer { color: #6b7280; font-size: 12px; margin: 0; line-height: 1.5; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <p class="header-label">ABZ Capital</p>
            <h1 class="header-title">Hi ${firstName}, we've got your ${category}.</h1>
          </div>
          <div class="content">
            <p class="text">
              ${intro || "Thanks for reaching out. A team member at ABZ Capital will get back to you within one business day with next steps."}
            </p>
            <p class="text text-margin">
              Need something faster? We respond fastest on WhatsApp.
            </p>
            <div class="button-container">
              <a href="${whatsappUrl}" class="button">Continue on WhatsApp</a>
            </div>
            <hr class="divider">
            <p class="footer">
              ABZ Capital Limited · Solaret Building, Utawala, Nairobi · +254 141 576 254<br>
              You're receiving this because you submitted a request via abzcapital.co.ke.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export default generateAutoReplyHtml;
