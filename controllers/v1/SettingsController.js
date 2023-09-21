import {TYPES} from '../../ioc/types';

class SettingsController {

  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  getInformation = async (req, res, next) => {
    try {
      const SettingsService = req.getService(TYPES.SettingsService);
      const information = await SettingsService.settings.getInformation();
      return res.sendSuccess(information);
    } catch (e) {
      next(e)
    }
  }
}

export default new SettingsController()
