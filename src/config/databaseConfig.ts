export default () => ({
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '27017', 10) || 27017,
  database: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
  },
});
