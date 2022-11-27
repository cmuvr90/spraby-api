import {Controller} from '..';
import {TYPES} from '../../ioc/types';

export class BrandController extends Controller {

  /**
   *
   * @returns {Promise<*>}
   */
  index = async () => {
    try {

      const BrandService = this.getService(TYPES.BrandService);
      const data = await BrandService.brand.find()
      .populate({
        path: 'categories',
        populate: {
          path: 'options',
        },
      })
      .populate('user')

      return await this.successResponse(data, true);
    } catch (e) {
      return await this.errorResponse(e);
    }
  }
}
