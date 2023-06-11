import AuthError from '../services/ErrorService/AuthError';

const AdminMiddleware = async (req, res, next) => {
  try {
    const user = req.getUser();
    if (!user.isAdmin()) AuthError.unauthorizedError();
    next();
  } catch (e) {
    AuthError.unauthorizedError();
  }
}

export default AdminMiddleware;
