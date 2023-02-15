import dotenv from 'dotenv';
import process from 'process';

dotenv.config();

module.exports = {
  port: process.env.PORT ? +process.env.PORT : 80,
  database: {
    url: process.env.MONGO_CONNECTION_URI
  },
  log: {
    withTerminal: process.env.LOG_WITH_TERMINAL === 'true',
    withDate: process.env.LOG_WITH_DATE === 'true',
    logFolder: process.env.LOG_FOLDER
  },
  session: {
    jwtAccessSecret: process.env.JWT_ACCESS_SEKRET,
    jwtAccessTokenKey: process.env.JWT_ACCESS_TOKEN_KEY,
    jwtAccessTokenMax: process.env.JWT_ACCESS_TOKEN_MAX,
    jwtRefreshSecret: process.env.JWT_REFRESH_SEKRET,
    jwtRefreshTokenKey: process.env.JWT_REFRESH_TOKEN_KEY,
    jwtRefreshTokenMax: process.env.JWT_REFRESH_TOKEN_MAX,
  }
};
