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
      const categories = await CategoryService.category.get();
      return res.sendSuccess(categories);
    } catch (e) {
      next(e)
    }
  }
}

export default new CategoryController()
