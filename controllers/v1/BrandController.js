import {TYPES} from '../../ioc/types';

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
      const brands = await BrandService.brand.getBrandsDto();
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
      const brands = await BrandService.brand.getBrandDtoById(id);
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
      const user = req.user;
      const BrandService = req.getService(TYPES.BrandService);
      const brand = await BrandService.brand.create({...params, user: user.id});
      const brandDto = await BrandService.brand.getBrandDto(brand);
      return res.sendSuccess(brandDto);
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
      const brandDto = await BrandService.brand.getBrandDtoById(id);
      return res.sendSuccess(brandDto);
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
}

export default new BrandController()
