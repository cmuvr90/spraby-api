import AuthError from '../services/ErrorService/AuthError';

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 * @constructor
 */
const ManagerMiddleware = async (req, res, next) => {
  try {
    if (req.user?.role !== 'manager') AuthError.unauthorizedError();
    next();
  } catch (e) {
    return next(e);
  }
}


export default ManagerMiddleware;
