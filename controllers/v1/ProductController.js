import {Controller} from '..';
import {TYPES} from '../../ioc/types';

export class ProductController extends Controller {

  /**
   *
   * @returns {Promise<*>}
   */
  index = async () => {
    const ProductService = this.getService(TYPES.ProductService);
    const products = await ProductService.product.get();

    try {
      return this.successResponse(products, true);
    } catch (e) {
      return this.errorResponse(e);
    }
  }
}
