import OptionController from '../../../controllers/v1/OptionController';

/**
 *
 * @param router
 */
export default function (router) {
  router.get('/options/list', OptionController.index);
}
