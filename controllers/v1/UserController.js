import {TYPES} from '../../ioc/types';

class UserController {

  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  index = async (req, res, next) => {
    try {
      const UserService = req.getService(TYPES.UserService);
      const users = await UserService.user.find();
      return res.sendSuccess(users);
    } catch (e) {
      next(e);
    }
  }

  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  login = async (req, res, next) => {
    try {
      const UserService = req.getService(TYPES.UserService);
      const {email, password} = req.body;
      const data = await UserService.login(email, password);
      return res.sendSuccess(data);
    } catch (e) {
      next(e);
    }
  }

  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  register = async (req, res, next) => {
    try {
      const UserService = req.getService(TYPES.UserService);
      const {email, password} = req.body;
      const data = await UserService.register(email, password);
      res.cookie('sprt', data.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.sendSuccess(data);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController()
