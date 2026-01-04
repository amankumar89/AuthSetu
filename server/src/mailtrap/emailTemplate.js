// EMAIL VERIFICATION TEMPLATE
export const EMAIL_VERIFICATION_TEMPLATE = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Email Verification</title>
  </head>
  <body style="font-family: Arial, sans-serif; background:#f6f8fa; padding:20px;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table width="500" style="background:#ffffff; padding:24px; border-radius:8px;">
            <tr>
              <td>
                <h2 style="margin:0 0 12px;">Verify your email</h2>
                <p>Hi {{userName}},</p>

                <p>
                  Welcome to <strong>{{appName}}</strong> 👋  
                  Use the verification code below to complete your signup:
                </p>

                <div style="text-align:center; margin:24px 0;">
                  <span
                    style="
                      font-size:24px;
                      letter-spacing:4px;
                      padding:12px 24px;
                      background:#f0f4ff;
                      border-radius:6px;
                      display:inline-block;
                    "
                  >
                    {{verificationCode}}
                  </span>
                </div>

                <p>This code is valid for <strong>{{expiryMinutes}} minutes</strong>.</p>

                <p style="font-size:14px; color:#666;">
                  If you didn’t request this, you can safely ignore this email.
                </p>

                <p>Thanks,<br /><strong>{{appName}} Team</strong></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

// WELCOME EMAIL TEMPLATE
export const WELCOME_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Welcome</title>
  </head>
  <body style="font-family: Arial, sans-serif; background:#f6f8fa; padding:20px;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table width="500" style="background:#ffffff; padding:24px; border-radius:8px;">
            <tr>
              <td>
                <h2>🎉 Welcome to {{appName}}</h2>

                <p>Hi {{userName}},</p>

                <p>
                  Your email has been <strong>successfully verified</strong>.  
                  We’re excited to have you on board!
                </p>

                <ul>
                  <li>✅ Secure login</li>
                  <li>🔐 Account management</li>
                  <li>🚀 Access all features</li>
                </ul>

                <p>
                  If you have any questions, feel free to reach out anytime.
                </p>

                <p>
                  Happy building 🚀<br />
                  <strong>{{appName}} Team</strong>
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

// PASSWORD RESET EMAIL TEMPLATE
export const PASSWORD_RESET_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Password Reset</title>
  </head>
  <body style="font-family: Arial, sans-serif; background:#f6f8fa; padding:20px;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table width="500" style="background:#ffffff; padding:24px; border-radius:8px;">
            <tr>
              <td>
                <h2>Reset your password</h2>

                <p>Hi {{userName}},</p>

                <p>
                  We received a request to reset your password.
                </p>

                <div style="text-align:center; margin:24px 0;">
                  <a
                    href="{{resetLink}}"
                    style="
                      background:#4f46e5;
                      color:#ffffff;
                      padding:12px 24px;
                      border-radius:6px;
                      text-decoration:none;
                      font-weight:bold;
                    "
                  >
                    Reset Password
                  </a>
                </div>

                <p>
                  This link will expire in <strong>{{expiryMinutes}} minutes</strong>.
                </p>

                <p style="font-size:14px; color:#666;">
                  If you didn’t request this, please ignore this email.
                </p>

                <p>
                  Stay secure 🔒<br />
                  <strong>{{appName}} Team</strong>
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

// PASSWORD CHANGE CONFIRMATION EMAIL TEMPLATE
export const PASSWORD_CHANGE_CONFIRMATION_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Password Changed</title>
  </head>
  <body style="font-family: Arial, sans-serif; background:#f6f8fa; padding:20px;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table width="500" style="background:#ffffff; padding:24px; border-radius:8px;">
            <tr>
              <td>
                <h2>🔐 Password Changed</h2>

                <p>Hi {{userName}},</p>

                <p>
                  This is a confirmation that your <strong>{{appName}}</strong>
                  password was changed.
                </p>

                <table style="margin:16px 0;">
                  <tr><td><strong>Date:</strong></td><td>{{date}}</td></tr>
                  <tr><td><strong>Device:</strong></td><td>{{device}}</td></tr>
                  <tr><td><strong>Location:</strong></td><td>{{location}}</td></tr>
                </table>

                <p>
                  If this was not you, please reset your password immediately
                  and contact support.
                </p>

                <p>
                  <strong>{{appName}} Security Team</strong>
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
