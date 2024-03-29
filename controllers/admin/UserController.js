import {TYPES} from '../../ioc/types';
import {getTime} from '../../services/utilites';
import AuthError from '../../services/ErrorService/AuthError';

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
      const users = await UserService.user.getUsersJsonById(req.query);
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
  get = async (req, res, next) => {
    try {
      const id = req?.params?.id;
      const UserService = req.getService(TYPES.UserService);
      const user = await UserService.user.getUserJsonById(id);
      return res.sendSuccess(user);
    } catch (e) {
      next(e)
    }
  }

  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  create = async (req, res, next) => {
    try {
      const params = req?.body;
      const UserService = req.getService(TYPES.UserService);
      const data = await UserService.createUser(params);
      const user = await UserService.user.getUserJsonById(data.id);
      return res.sendSuccess(user);
    } catch (e) {
      next(e)
    }
  }

  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  update = async (req, res, next) => {
    try {
      const id = req?.params?.id;
      const params = req?.body;
      const UserService = req.getService(TYPES.UserService);
      await UserService.user.updateById(id, params);
      const user = await UserService.user.getUserJsonById(id);
      return res.sendSuccess(user);
    } catch (e) {
      next(e)
    }
  }

  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  delete = async (req, res, next) => {
    try {
      const id = req?.params?.id;
      const UserService = req.getService(TYPES.UserService);
      await UserService.user.deleteById(id);
      return res.sendSuccess({});
    } catch (e) {
      next(e)
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
      const SessionConfig = req.getService(TYPES.SessionConfig);

      const {email, password} = req.body;
      const {accessToken, refreshToken, user} = await UserService.register(email, password);

      res.cookie(SessionConfig.jwtRefreshTokenKey, refreshToken, {
        maxAge: getTime(SessionConfig.jwtRefreshTokenMax),
        httpOnly: true
      })

      return res.sendSuccess({accessToken, user});
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
      const SessionConfig = req.getService(TYPES.SessionConfig);
      const Config = req.getService(TYPES.Config);

      const {email, password} = req.body;
      const {accessToken, refreshToken, user} = await UserService.login(email, password);

      res.cookie(SessionConfig.jwtRefreshTokenKey, refreshToken, {
        maxAge: getTime(SessionConfig.jwtRefreshTokenMax),
        httpOnly: true,
        domain: Config.domain
      })

      return res.sendSuccess({accessToken, user});
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
  logout = async (req, res, next) => {
    try {
      const UserService = req.getService(TYPES.UserService);
      const SessionConfig = req.getService(TYPES.SessionConfig);

      const refreshToken = req.cookies[SessionConfig.jwtRefreshTokenKey];
      await UserService.logout(refreshToken);
      res.clearCookie(SessionConfig.jwtRefreshTokenKey);

      return res.json({});
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
  refresh = async (req, res, next) => {
    try {
      const UserService = req.getService(TYPES.UserService);
      const SessionConfig = req.getService(TYPES.SessionConfig);

      const refreshToken = req.cookies[SessionConfig.jwtRefreshTokenKey];
      const data = await UserService.refresh(refreshToken);

      res.cookie(SessionConfig.jwtRefreshTokenKey, data.refreshToken, {
        maxAge: getTime(SessionConfig.jwtRefreshTokenMax),
        httpOnly: true
      })

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
  getAuthUser = async (req, res, next) => {
    try {
      const UserService = req.getService(TYPES.UserService);
      const SessionConfig = req.getService(TYPES.SessionConfig);

      const refreshToken = req.cookies[SessionConfig.jwtRefreshTokenKey];
      const user = await UserService.getAuthUser(refreshToken);

      if (!user) AuthError.unauthorizedError();

      return res.sendSuccess({user});
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController()
