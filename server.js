import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import {connectToMongo} from './database';
import config from './config';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors({origin: '*'}));
app.use('/public', express.static(path.join(__dirname, 'static')));

(async function start() {
  const isConnected = await connectToMongo(config.database.url);
  if (!isConnected) return;

  app.listen(config.port, function () {
    console.log(`✔ Server started at http://localhost:${config.port}`)
  })
})()
