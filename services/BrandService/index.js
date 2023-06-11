export default class BrandService {

  /**
   *
   * @param Brand
   * @param LogService
   */
  constructor(Brand, LogService) {
    this.brand = Brand;
    this.log = LogService.createLogger('BrandService');
  }
}
