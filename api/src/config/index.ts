export const config = () => ({
  port: process.env.API_PORT ?? 5000,
  secret: {
    jwt: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRE_TIME,
  },
});
