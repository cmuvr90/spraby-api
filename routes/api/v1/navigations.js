import NavigationController from '../../../controllers/v1/NavigationController';

/**
 *
 * @param router
 */
export default function (router) {
  router.get('/navigations/main', NavigationController.main);
}
