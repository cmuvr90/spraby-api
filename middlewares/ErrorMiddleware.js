import LoginError from '../services/ErrorService/LoginError';
import RegisterError from '../services/ErrorService/RegisterError';
import AuthError from '../services/ErrorService/AuthError';
import {TYPES} from '../ioc/types';

const ErrorMiddleware = async (err, req, res, next) => {
  const log = req.getService(TYPES.LogService);

  if (err instanceof LoginError) {
    await log.createLogger('LoginError').error(err.message, err.code, err.errors);
    return res.sendError(err.message, err.code, err.errors);
  }

  if (err instanceof RegisterError) {
    await log.createLogger('RegisterError').error(err.message, err.code, err.errors);
    return res.sendError(err.message, err.code, err.errors);
  }

  if (err instanceof AuthError) {
    await log.createLogger('AuthError').error(err.message, err.code, err.errors);
    return res.sendError(err.message, err.code, err.errors);
  }

  await log.createLogger('Errors').error(err);
  return res.sendError('Server error', 500, [err?.message ?? 'error']);
}


export default ErrorMiddleware
