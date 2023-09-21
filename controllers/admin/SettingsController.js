import {TYPES} from '../../ioc/types';
import MainError from "../../services/ErrorService/MainError";

class SettingsController {

  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  get = async (req, res, next) => {
    try {
      const SettingsService = req.getService(TYPES.SettingsService);
      const settings = await SettingsService.settings.getSettings();
      return res.sendSuccess(settings);
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
  updateInformation = async (req, res, next) => {
    try {
      const {information = null} = req?.body;
      if (information === null) MainError.badRequestError();
      const SettingsService = req.getService(TYPES.SettingsService);
      const response = await SettingsService.settings.setInformation(information);
      if (!response) MainError.badRequestError();
      return res.sendSuccess({information});
    } catch (e) {
      next(e)
    }
  }
}

export default new SettingsController()
