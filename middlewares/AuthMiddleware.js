/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
import AuthError from '../services/ErrorService/AuthError';
import {TYPES} from '../ioc/types';

const AuthMiddleware = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) AuthError.unauthorizedError();

    const accessToken = authorizationHeader.split(' ').pop();
    if (!accessToken) AuthError.unauthorizedError();

    const userData = req.getService(TYPES.SessionService).validateAccessToken(accessToken);
    if (!userData) AuthError.unauthorizedError();

    req.user = userData;
    next();
  } catch (e) {
    return next(e);
  }
}


export default AuthMiddleware;
