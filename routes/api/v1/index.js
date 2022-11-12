import users from './users';

const prefix = '/api/v1'

export default function (app) {
  app.get(`/`, async (req, res) => res.send('Api V1 started! 🛫'));
  users(app, prefix);
}
