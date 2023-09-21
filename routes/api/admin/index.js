import Router from 'express';
import users from './users';
import brands from './brands';
import categories from './categories';
import collections from './collections';
import options from './options';
import products from './products';
import variants from './variants';
import navigations from './navigations';
import settings from './settings';

const apiRouterV1 = new Router();

apiRouterV1.get(`/`, async (req, res, next) => {
  return res.send('Api ADMIN started! 🛫')
});

users(apiRouterV1)
brands(apiRouterV1)
categories(apiRouterV1)
collections(apiRouterV1)
options(apiRouterV1)
products(apiRouterV1)
variants(apiRouterV1)
navigations(apiRouterV1)
settings(apiRouterV1)

export default apiRouterV1;
