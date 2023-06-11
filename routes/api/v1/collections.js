import CollectionController from '../../../controllers/v1/CollectionController';

/**
 *
 * @param router
 */
export default function (router) {
  router.get('/collections/:handle', CollectionController.get);
}
