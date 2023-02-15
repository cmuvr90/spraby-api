import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import {connectToMongo} from './database';
import config from './config';
import {apiRouterV1, router} from './routes';
import container from './ioc';
import {error, init} from './middlewares';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3001'
}));
app.use('/public', express.static(path.join(__dirname, 'static')));

app.set('ioc', container);

router.get('/', (req, res, next) => {
  return res.send(`<div style="margin: 200px auto; text-align: center;">SPRA.BY API 🚀</div>`);
})

app.use(init(app));
app.use('/', router);
app.use('/api/v1', apiRouterV1);
app.use(error);

(async function start() {
  const isConnected = await connectToMongo(config.database.url);
  if (!isConnected) return;

  app.listen(config.port, function () {
    console.log(`✔ Server started at http://localhost:${config.port}`)
  })
})()
