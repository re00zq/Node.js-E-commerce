export default () => ({
  host: process.env.HOST,
  port: parseInt(process.env.PORT || '3000', 10),
  url: process.env.URL,
});
