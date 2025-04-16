export default () => ({
  service: process.env.MAIL_SERVICE,
  username: process.env.SMTP_USERNAME,
  password: process.env.SMTP_PASSWORD,
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
});
