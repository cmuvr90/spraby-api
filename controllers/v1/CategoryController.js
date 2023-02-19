import {TYPES} from '../../ioc/types';

class CategoryController {

  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  index = async (req, res, next) => {
    try {
      const CategoryService = req.getService(TYPES.CategoryService);
      const categories = await CategoryService.category.getCategoriesDto();
      return res.sendSuccess(categories);
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
      const handle = req?.params?.handle;
      const CategoryService = req.getService(TYPES.CategoryService);
      const categories = await CategoryService.category.getCategoryDtoByHandle(handle);
      return res.sendSuccess(categories);
    } catch (e) {
      next(e)
    }
  }
}

export default new CategoryController()
