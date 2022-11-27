import users from './users';
import brands from './brands';

const prefix = '/api/v1'

export default function (app) {
  app.get(`/`, async (req, res) => res.send('Api V1 started! 🛫'));
  users(app, prefix);
  brands(app, prefix);
}
