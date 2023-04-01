import apiRouterV1 from './api/v1';
import apiAdmin from './api/admin';
import Router from 'express';

const router = new Router();

export {
  apiAdmin,
  apiRouterV1,
  router
}
