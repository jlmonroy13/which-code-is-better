import { EmailConfig } from "next-auth/providers/email";

export async function sendVerificationRequest(params: {
  identifier: string;
  url: string;
  expires: Date;
  provider: EmailConfig;
  token: string;
  request: Request;
}) {
  const { identifier: to, provider, url } = params;
  const { host } = new URL(url);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${provider.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Which code is Better <${provider.from}>`,
      to,
      subject: 'Your Magic Link for "Which code is Better" is Here! 🚀',
      html: html({ url, host }),
      text: text({ url, host }),
    }),
  });

  if (!res.ok)
    throw new Error("Resend error: " + JSON.stringify(await res.json()));
}

function html(params: { url: string; host: string }) {
  const { url, host } = params;

  const brandColor = "#FF533D";
  const color = {
    background: "#16171b",
    text: "#fff",
    secondaryColor: "rgb(201, 201, 201)",
    mainBackground: "rgb(40, 44, 52)",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: "#fff",
  };

  return `
<body style="background: ${color.background}; padding: 40px 0; border-radius: 10px;">
  <table width="100%" border="0" cellspacing="5" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px; padding:0 30px">
    <tr>
      <td align="center"
        style="padding: 20px 0px 10px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        <strong>Which code is Better</strong>
      </td>
    </tr>
    <tr>
      <td align="left"
        style="padding: 10px 0 0; font-size: 17px; font-family: Helvetica, Arial, sans-serif; color: ${color.secondaryColor};">
        Welcome to the community! 🚀
      </td>
    </tr>
    <tr>
      <td align="left"
        style="font-size: 17px; font-family: Helvetica, Arial, sans-serif; color: ${color.secondaryColor};">
        Click the link below to effortlessly sign in and start voting on the best code snippets:
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 35px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                target="_blank"
                style="font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 8px 40px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                in</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="left"
        style="padding: 0px 0px 40px 0px; font-size: 17px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.secondaryColor};">
        If you didn’t request this email, no worries—you can safely ignore it.
      </td>
    </tr>
    <tr>
      <td align="left"
        style="font-size: 17px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.secondaryColor};">
        Happy coding!
      </td>
    </tr>
    <tr>
      <td align="left"
        style="font-size: 17px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.secondaryColor};">
        Which code is Better Team
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 40px 0 20px; font-size: 12px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        <a href="https://www.whichcodeisbetter.io" style="color: ${color.text};">${host}</a>
      </td>
    </tr>
  </table>
</body>
`;
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}
