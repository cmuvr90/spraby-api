import AuthError from '../services/ErrorService/AuthError';

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 * @constructor
 */
const AdminMiddleware = async (req, res, next) => {
  try {
    if (req.user?.role !== 'admin') AuthError.unauthorizedError();
    next();
  } catch (e) {
    return next(e);
  }
}


export default AdminMiddleware;
