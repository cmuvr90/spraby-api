import {TYPES} from '../../ioc/types';
import MainError from '../../services/ErrorService/MainError';
import {getTime} from '../../services/utilites';

class BrandController {

  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<void>}
   */
  index = async (req, res, next) => {
    try {
      const BrandService = req.getService(TYPES.BrandService);
      const brands = await BrandService.brand.getBrandsJsonById();
      return res.sendSuccess(brands);
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
  get = async (req, res, next) => {
    try {
      const id = req?.params?.id;
      const BrandService = req.getService(TYPES.BrandService);
      const brands = await BrandService.brand.getBrandJsonById(id);
      return res.sendSuccess(brands);
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
      const BrandService = req.getService(TYPES.BrandService);
      const data = await BrandService.brand.createBrand({...params});
      const brand = await BrandService.brand.getBrandJsonById(data.id);
      return res.sendSuccess(brand);
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
      const BrandService = req.getService(TYPES.BrandService);
      await BrandService.brand.updateById(id, params);
      const brand = await BrandService.brand.getBrandJsonById(id);
      return res.sendSuccess(brand);
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
      const BrandService = req.getService(TYPES.BrandService);
      await BrandService.brand.deleteById(id);
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
  login = async (req, res, next) => {
    try {
      const id = req?.body?.id;

      const BrandService = req.getService(TYPES.BrandService);
      const Config = req.getService(TYPES.Config);

      const brand = await BrandService.brand.findById(id);
      if (!brand) MainError.badRequestError();

      const UserService = req.getService(TYPES.UserService);
      const user = await UserService.user.findById(brand.user);
      if (!user) MainError.badRequestError();

      const {accessToken, refreshToken} = await UserService.getUserJWTokens(user);

      const SessionConfig = req.getService(TYPES.SessionConfig);

      res.cookie(SessionConfig.jwtRefreshTokenKey, refreshToken, {
        maxAge: getTime(SessionConfig.jwtRefreshTokenMax),
        httpOnly: true,
        domain: Config.domain
      })

      return res.sendSuccess({accessToken, user});
    } catch (e) {
      next(e)
    }
  }
}

export default new BrandController()
