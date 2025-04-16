export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
    expiredIn: process.env.JWT_EXPIRED_IN,
  },

  refreshJwt: {
    secret: process.env.JWT_REFRESH_SECRET,
    expiredIn: process.env.JWT_REFRESH_EXPIRED_IN,
  },

  confirmation: {
    secret: process.env.JWT_CONFIRMATION_SECRET,
    expiredIn: process.env.JWT_CONFIRMATION_EXPIRED_IN,
  },
});
