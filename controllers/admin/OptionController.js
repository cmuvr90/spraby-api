import {TYPES} from '../../ioc/types';
import {getHandle} from '../../services/utilites';

class OptionController {

  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  index = async (req, res, next) => {
    try {
      const OptionService = req.getService(TYPES.OptionService);
      const params = {};
      if (req.query?.ids?.length) params.ids = req.query.ids;
      if (req.query?.page) params.page = req.query.page;
      if (req.query?.limit) params.limit = req.query.limit;
      if (req.query?.query) params.query = req.query.query;

      const options = await OptionService.option.getOptionsJson(params);
      return res.sendSuccess(options);
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
      const OptionService = req.getService(TYPES.OptionService);
      const option = await OptionService.option.getOptionJsonById(id);
      return res.sendSuccess(option);
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
      const OptionService = req.getService(TYPES.OptionService);
      const data = await OptionService.option.create({...params, key: getHandle(params.name)});
      const option = await OptionService.option.getOptionJsonById(data.id);
      return res.sendSuccess(option);
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
      const OptionService = req.getService(TYPES.OptionService);
      await OptionService.option.updateById(id, params);
      const option = await OptionService.option.getOptionJsonById(id);
      return res.sendSuccess(option);
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
      const OptionService = req.getService(TYPES.OptionService);
      await OptionService.option.deleteById(id);
      return res.sendSuccess({});
    } catch (e) {
      next(e)
    }
  }
}

export default new OptionController()
