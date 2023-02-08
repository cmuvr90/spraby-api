/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const AuthMiddleware = async (req, res, next) => {
  try {
    next();
  } catch (e) {
    return res.status(401).send(e?.message || e);
  }
}


export default AuthMiddleware;
