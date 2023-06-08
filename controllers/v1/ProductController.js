import {TYPES} from '../../ioc/types';

class ProductController {

  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  index = async (req, res, next) => {
    try {
      const query = req.query;
      const ProductService = req.getService(TYPES.ProductService);
      const products = await ProductService.product.getProductsByParams(query);
      return res.sendSuccess(products);
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
      const ProductService = req.getService(TYPES.ProductService);
      const product = await ProductService.product.getProductJsonById(req.params.id);
      return res.sendSuccess(product);
    } catch (e) {
      next(e)
    }
  }
}

export default new ProductController()
