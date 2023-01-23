export default class VariantService {

  /**
   *
   * @param Variant
   * @param LogService
   */
  constructor(Variant, LogService) {
    this.variant = Variant;
    this.log = LogService.createLogger('variant_service');
  }
}
