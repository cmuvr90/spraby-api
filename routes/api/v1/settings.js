import SettingsController from '../../../controllers/v1/SettingsController';

/**
 *
 * @param router
 */
export default function (router) {
  router.get('/settings/information', SettingsController.getInformation);
}
