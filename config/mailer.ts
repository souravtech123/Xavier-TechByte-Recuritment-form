import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'xts@sxcran.org',
    pass: '$TechByte282024#',
  },
});

export async function sendConfirmationEmail(
  toEmail: string,
  fullName: string
) {
  const firstName = fullName.trim().split(" ")[0];

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Registration Confirmed – Xavier TechByte Society</title>
</head>
<body style="margin:0;padding:0;background-color:#020617;font-family:'Segoe UI',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#020617;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td align="center" style="padding:0 0 32px 0;">
              <div style="background:linear-gradient(135deg,#7c3aed,#06b6d4);border-radius:16px;padding:2px;">
                <div style="background:#020617;border-radius:14px;padding:28px 40px;text-align:center;">
                  <p style="margin:0;font-size:13px;font-weight:700;letter-spacing:3px;color:#a78bfa;text-transform:uppercase;">Xavier TechByte Society</p>
                  <h1 style="margin:10px 0 0;font-size:28px;font-weight:900;color:#ffffff;">
                    XTS
                    <span style="background:linear-gradient(90deg,#a78bfa,#f0abfc,#67e8f9);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">
                      Interview
                    </span>
                  </h1>
                </div>
              </div>
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td>
              <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:24px;overflow:hidden;">

                <!-- Green confirmation bar -->
                <div style="background:linear-gradient(90deg,#7c3aed,#06b6d4);height:4px;"></div>

                <div style="padding:40px;">

                  <!-- Checkmark Icon -->
                  <div style="text-align:center;margin-bottom:28px;">
                    <div style="display:inline-block;background:rgba(124,58,237,0.15);border:1px solid rgba(124,58,237,0.4);border-radius:50%;width:72px;height:72px;line-height:72px;font-size:34px;">
                      ✅
                    </div>
                  </div>

                  <!-- Greeting -->
                  <h2 style="margin:0 0 8px;text-align:center;font-size:24px;font-weight:800;color:#ffffff;">
                    Thank you, ${firstName}! 🎉
                  </h2>
                  <p style="margin:0 0 28px;text-align:center;font-size:15px;color:#94a3b8;line-height:1.6;">
                    Your registration for the <strong style="color:#c4b5fd;">Xavier TechByte Society Interview</strong> has been successfully received.
                  </p>

                  <!-- Divider -->
                  <div style="border-top:1px solid rgba(255,255,255,0.08);margin:0 0 28px;"></div>

                  <!-- Info Box -->
                  <div style="background:rgba(124,58,237,0.08);border:1px solid rgba(124,58,237,0.25);border-radius:14px;padding:24px;margin-bottom:28px;">
                    <p style="margin:0 0 12px;font-size:13px;font-weight:700;letter-spacing:2px;color:#a78bfa;text-transform:uppercase;">📋 What Happens Next?</p>
                    <ul style="margin:0;padding-left:20px;color:#cbd5e1;font-size:14px;line-height:2;">
                      <li>Our team will carefully review all applications.</li>
                      <li>Shortlisted candidates will be contacted via <strong style="color:#fff;">Email & WhatsApp</strong>.</li>
                      <li><strong style="color:#fff;">Interview details</strong> will be provided soon — stay tuned!</li>
                      <li>Keep an eye on your inbox (and spam folder, just in case 😄).</li>
                    </ul>
                  </div>

                  <!-- Quote -->
                  <div style="background:rgba(6,182,212,0.06);border-left:3px solid #06b6d4;border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:28px;">
                    <p style="margin:0;font-size:14px;color:#7dd3fc;font-style:italic;">
                      "Every expert was once a beginner. Your journey with XTS starts now."
                    </p>
                  </div>

                  <!-- CTA Button -->
                  <div style="text-align:center;margin-bottom:8px;">
                    <a href="https://xaviertechbyte.com" 
                       style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#06b6d4);color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:12px;letter-spacing:0.5px;">
                      Visit Our Website →
                    </a>
                  </div>

                </div>

                <!-- Footer -->
                <div style="background:rgba(0,0,0,0.3);padding:24px 40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
                  <p style="margin:0 0 6px;font-size:13px;color:#64748b;">
                    Best regards,<br/>
                    <strong style="color:#a78bfa;">Xavier TechByte Society Team</strong>
                  </p>
                  <p style="margin:8px 0 0;font-size:11px;color:#475569;">
                    This is an automated email. Please do not reply directly to this message.
                  </p>
                </div>

              </div>
            </td>
          </tr>

          <!-- Bottom note -->
          <tr>
            <td style="padding:24px 0 0;text-align:center;">
              <p style="margin:0;font-size:11px;color:#334155;">
                © 2025 Xavier TechByte Society &nbsp;|&nbsp; All rights reserved
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `;

  await transporter.sendMail({
    from: `"Xavier TechByte Society" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "✅ Registration Confirmed – Xavier TechByte Society Interview",
    html: htmlContent,
  });
}
