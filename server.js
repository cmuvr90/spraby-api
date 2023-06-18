import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {connectToMongo} from './database';
import config from './config';
import {apiRouterV1, apiAdmin, router} from './routes';
import container from './ioc';
import {error, init} from './middlewares';
import fileUpload from 'express-fileupload';

const app = express();

app.use(fileUpload());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(express.static('files'))

app.set('ioc', container);
app.use(cors({
  credentials: true,
  origin: (origin, callback) => {

    console.log('process.env = ', process.env);
    console.log('origin = ', origin);

    if (typeof origin === 'undefined') {
      callback(null, true);
    } else if (JSON.parse(process.env.WHITE_LIST).indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      console.log('Error CORS!')
      callback(new Error())
    }
  }
}));

router.get('/', (req, res, next) => {
  return res.send(`<div style="margin: 200px auto; text-align: center;">SPRA.BY API 🚀</div>`);
})

app.use(init(app));
app.use('/', router);
app.use('/api/v1', apiRouterV1);
app.use('/api/admin', apiAdmin);
app.use(error);

(async function start() {
  const isConnected = await connectToMongo(config.database.url);
  if (!isConnected) return;

  app.listen(config.port, function () {
    console.log(`✔ Server started at http://localhost:${config.port}`)
  })
})()
