import {TYPES} from '../../ioc/types';

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
      const options = await OptionService.option.get();
      return res.sendSuccess(options);
    } catch (e) {
      next(e)
    }
  }
}

export default new OptionController()
