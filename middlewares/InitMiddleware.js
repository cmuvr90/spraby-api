/**
 *
 * @param app
 * @returns {function(*, *, *): *}
 * @constructor
 */
const InitMiddleware = app => async (req, res, next) => {
  req.getService = type => app.get('ioc').get(type);
  req.getUser = () => req.user;
  req.getBrand = () => req.brand;
  req.getPath = () => req.path;
  req.getMethod = () => req.method;

  res.sendSuccess = data => res.status(200).json({data, status: 'success'});
  res.sendError = (message = '', code = 500, errors = []) => res.status(code).json({
    message,
    errors,
    code,
    status: 'error'
  });

  return next();
}

export default InitMiddleware;
