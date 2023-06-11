import {TYPES} from '../../ioc/types';

class CategoryController {

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
      const category = await CategoryService.category.getCategoryJsonByHandle(handle);
      return res.sendSuccess(category);
    } catch (e) {
      next(e)
    }
  }
}

export default new CategoryController()
