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

    const isCheck = req.getService(TYPES.PermissionService).check(req);
    if (!isCheck) AuthError.unauthorizedError();

    const user = await req.getService(TYPES.UserService).user.getUserJsonByEmail(userData.email)
    if (!user) AuthError.unauthorizedError();

    req.user = user;
    next();
  } catch (e) {
    return next(e);
  }
}


export default AuthMiddleware;
