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
      const ProductService = req.getService(TYPES.ProductService);
      const product = await ProductService.product.createProduct({...params, brand: brand.getId()});
      const productDto = await ProductService.product.getProductDto(product);
      return res.sendSuccess(productDto);
    } catch (e) {
      next(e)
    }
  }
}

export default new VariantController()
