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
  }
};
