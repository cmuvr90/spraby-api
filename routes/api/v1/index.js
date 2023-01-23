import users from './users';
import brands from './brands';
import categories from './categories';
import collections from './collections';
import options from './options';
import products from './products';
import variants from './variants';

const prefix = '/api/v1'

export default function (app) {
  app.get(`/`, async (req, res) => res.send('Api V1 started! 🛫'));
  users(app, prefix);
  brands(app, prefix);
  categories(app, prefix);
  collections(app, prefix);
  options(app, prefix);
  products(app, prefix);
  variants(app, prefix);
}
