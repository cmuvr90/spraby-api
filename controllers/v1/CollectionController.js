import {TYPES} from '../../ioc/types';

class CollectionController {

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
      const collection = await CollectionService.collection.getCollectionJsonByHandle(handle);
      return res.sendSuccess(collection);
    } catch (e) {
      next(e)
    }
  }
}

export default new CollectionController();
