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
}

export default new ProductController()
