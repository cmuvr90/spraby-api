import {TYPES} from '../../ioc/types';

class VariantController {

  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  index = async (req, res, next) => {
    try {
      const VariantService = req.getService(TYPES.VariantService);
      const variants = await VariantService.variant.get();
      return res.sendSuccess(variants);
    } catch (e) {
      next(e)
    }
  }
}

export default new VariantController()
