import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY || "",
  domain: process.env.MAILGUN_EMAIL || ""
})

const sendEmail = (subject: string, html: string) => {
  const emailData: Mailgun.messages.SendData = {
    from: "shkim.roy.d@gmail.com",
    to: "shkim.roy.d@gmail.com",
    subject,
    html
  }
  return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (fullName: string, key: string) => {
  const emailSubject = `Hello! ${fullName}, please verify your email`;
  const emailBody = `Verify your email by click <a href="http://google.com/verification/${key}>here</a>`;
  return sendEmail(emailSubject, emailBody);
}