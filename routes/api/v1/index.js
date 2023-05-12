import Router from 'express';
import navigations from './navigations';
import collections from './collections';

// import brands from './brands';
// import options from './options';
// import products from './products';
// import variants from './variants';

const apiRouterV1 = new Router();

apiRouterV1.get(`/`, async (req, res, next) => {
  return res.send('Api V1 started! 🛫')
});

navigations(apiRouterV1)
collections(apiRouterV1)

// users(apiRouterV1)
// brands(apiRouterV1)
// categories(apiRouterV1)
// options(apiRouterV1)
// products(apiRouterV1)
// variants(apiRouterV1)

export default apiRouterV1;
