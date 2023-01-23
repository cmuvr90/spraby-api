export default class CollectionService {

  /**
   *
   * @param Collection
   * @param LogService
   */
  constructor(Collection, LogService) {
    this.collection = Collection;
    this.log = LogService.createLogger('collection_service');
  }
}
