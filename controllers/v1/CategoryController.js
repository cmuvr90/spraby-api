import {Controller} from '..';
import {TYPES} from '../../ioc/types';

export class CategoryController extends Controller {

  /**
   *
   * @returns {Promise<*>}
   */
  index = async () => {
    const CategoryService = this.getService(TYPES.CategoryService);
    const categories = await CategoryService.category.get();

    try {
      return this.successResponse(categories, true);
    } catch (e) {
      return this.errorResponse(e);
    }
  }
}
