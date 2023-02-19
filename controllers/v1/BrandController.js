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
}

export default new BrandController()
