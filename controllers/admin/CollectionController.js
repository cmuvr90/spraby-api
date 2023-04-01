import {TYPES} from '../../ioc/types';
import {getHandle} from '../../services/utilites';

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

  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  create = async (req, res, next) => {
    try {
      const params = req?.body;
      const CollectionService = req.getService(TYPES.CollectionService);
      const collection = await CollectionService.collection.create({...params, handle: getHandle(params.name)});
      const collectionDto = await CollectionService.collection.getCollectionDto(collection);
      return res.sendSuccess(collectionDto);
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
  update = async (req, res, next) => {
    try {
      const id = req?.params?.id;
      const params = req?.body;
      const CollectionService = req.getService(TYPES.CollectionService);
      await CollectionService.collection.updateById(id, params);
      const collectionDto = await CollectionService.collection.getCollectionDtoById(id);
      return res.sendSuccess(collectionDto);
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
  delete = async (req, res, next) => {
    try {
      const id = req?.params?.id;
      const CollectionService = req.getService(TYPES.CollectionService);
      await CollectionService.collection.deleteById(id);
      return res.sendSuccess({});
    } catch (e) {
      next(e)
    }
  }
}

export default new CollectionController();
