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
      const collections = await CollectionService.collection.get();
      return res.sendSuccess(collections);
    } catch (e) {
      next(e)
    }
  }
}

export default new CollectionController();
