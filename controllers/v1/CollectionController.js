import {TYPES} from '../../ioc/types';

class CollectionController {

  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  index = async (req, res, next) => {
    try {
      const CollectionService = req.getService(TYPES.CollectionService);
      const collections = await CollectionService.collection.getCollectionsDto();
      return res.sendSuccess(collections);
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
  get = async (req, res, next) => {
    try {
      const handle = req?.params?.handle;
      const CollectionService = req.getService(TYPES.CollectionService);
      const collection = await CollectionService.collection.getCollectionDtoByHandle(handle);
      return res.sendSuccess(collection);
    } catch (e) {
      next(e)
    }
  }
}

export default new CollectionController();
