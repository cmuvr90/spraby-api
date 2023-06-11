import {TYPES} from '../../ioc/types';

class NavigateController {

  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  get = async (req, res, next) => {
    try {
      const type = req?.params?.type;
      const SettingsService = req.getService(TYPES.SettingsService);
      const navigation = await SettingsService.navigation.getNavigationJsonByType(type);
      return res.sendSuccess(navigation);
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
      const SettingsService = req.getService(TYPES.SettingsService);
      const data = await SettingsService.navigation.createNavigation(params);
      const navigation = await SettingsService.navigation.getNavigationJsonByType(data.getId());
      return res.sendSuccess(navigation);
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
      const SettingsService = req.getService(TYPES.SettingsService);
      await SettingsService.navigation.updateById(id, params);
      const navigation = await SettingsService.navigation.getNavigationJsonById(id);
      return res.sendSuccess(navigation);
    } catch (e) {
      next(e)
    }
  }

}

export default new NavigateController()
