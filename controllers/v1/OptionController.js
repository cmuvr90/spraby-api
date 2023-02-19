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
      const options = await OptionService.option.getOptionsDto();
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
      const option = await OptionService.option.getOptionDtoById(id);
      return res.sendSuccess(option);
    } catch (e) {
      next(e)
    }
  }
}

export default new OptionController()
