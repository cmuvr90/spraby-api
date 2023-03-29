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
      const VariantService = req.getService(TYPES.VariantService);
      const ProductService = req.getService(TYPES.ProductService);
      const variant = await VariantService.variant.createVariant({...params});
      await ProductService.product.addVariants(params.product, [variant._id])
      return res.sendSuccess(variant);
    } catch (e) {
      next(e)
    }
  }

  delete = async (req, res, next) => {
    try {
      const id = req?.params?.id;
      const VariantService = req.getService(TYPES.VariantService);
      await VariantService.variant.deleteById(id);
      return res.sendSuccess({});
    } catch (e) {
      next(e)
    }
  }
}

export default new VariantController()
