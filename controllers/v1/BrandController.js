import {Controller} from '..';
import {TYPES} from '../../ioc/types';

export class BrandController extends Controller {

  /**
   *
   * @returns {Promise<*>}
   */
  index = async () => {
    const BrandService = this.getService(TYPES.BrandService);
    const brands = await BrandService.brand.get();

    try {
      return this.successResponse(brands, true);
    } catch (e) {
      return this.errorResponse(e);
    }
  }
}
