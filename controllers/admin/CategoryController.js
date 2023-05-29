import {TYPES} from '../../ioc/types';
import {getHandle} from '../../services/utilites';

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
      const params = {};
      if (req.query?.ids?.length) params.ids = req.query.ids;

      const categories = await CategoryService.category.getCategoriesJson(params);
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
      const id = req?.params?.id;
      const CategoryService = req.getService(TYPES.CategoryService);
      const category = await CategoryService.category.getCategoryJsonById(id);
      return res.sendSuccess(category);
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
      const CategoryService = req.getService(TYPES.CategoryService);
      const data = await CategoryService.category.create({...params, handle: getHandle(params.name)});
      const category = await CategoryService.category.getCategoryJsonById(data.id);
      return res.sendSuccess(category);
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
  update = async (req, res, next) => {
    try {
      const id = req?.params?.id;
      const params = req?.body;
      const CategoryService = req.getService(TYPES.CategoryService);
      await CategoryService.category.updateById(id, params);
      const category = await CategoryService.category.getCategoryJsonById(id);
      return res.sendSuccess(category);
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
  delete = async (req, res, next) => {
    try {
      const id = req?.params?.id;
      const CategoryService = req.getService(TYPES.CategoryService);
      await CategoryService.category.deleteById(id);
      return res.sendSuccess({});
    } catch (e) {
      next(e)
    }
  }
}

export default new CategoryController()
