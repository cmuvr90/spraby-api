import {Controller} from '..';
import {TYPES} from '../../ioc/types';

export class CollectionController extends Controller {

  /**
   *
   * @returns {Promise<*>}
   */
  index = async () => {
    const CollectionService = this.getService(TYPES.CollectionService);
    const collections = await CollectionService.collection.get();

    try {
      return this.successResponse(collections, true);
    } catch (e) {
      return this.errorResponse(e);
    }
  }
}
