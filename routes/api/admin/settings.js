import SettingsController from '../../../controllers/admin/SettingsController';

/**
 *
 * @param router
 */
export default function (router) {
  router.get('/settings', SettingsController.get);
  router.put('/settings/information', SettingsController.updateInformation);
}
