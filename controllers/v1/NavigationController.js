import {TYPES} from '../../ioc/types';

class NavigationController {

  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  main = async (req, res, next) => {
    try {
      const SettingsService = req.getService(TYPES.SettingsService);
      const navigation = await SettingsService.navigation.getNavigationJsonByType('main');
      return res.sendSuccess(navigation?.body ?? []);
    } catch (e) {
      next(e)
    }
  }
}

export default new NavigationController()
