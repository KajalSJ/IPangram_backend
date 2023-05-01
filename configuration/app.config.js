import dotenv from "dotenv";
dotenv.config();

const config = {
  ENV: process.env.ENV,
  PORT: process.env.PORT ? process.env.PORT : 3001,
  APP_URL: process.env.APP_URL,
  SQL_HOST: process.env.SQL_HOST,
  SQL_USER: process.env.SQL_USER,
  SQL_PASSWORD: process.env.SQL_PASSWORD,
  SQL_DATABASE: process.env.SQL_DATABASE,
  JWT_ISS: process.env.JWT_ISS,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
};

export default config;
