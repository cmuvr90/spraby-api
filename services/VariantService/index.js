export default class VariantService {
  //
  // /**
  //  *
  //  * @param Variant
  //  * @param LogService
  //  */
  // constructor(Variant, LogService) {
  //   this.variant = Variant;
  //   this.log = LogService.createLogger('variant_service');
  // }
  //
  // /**
  //  *
  //  * @returns {Promise<void>}
  //  */
  // async saveVariants(productId, variants) {
  //   for (const variant of variants) {
  //     await this.saveVariant(productId, variant)
  //   }
  // }
  //
  // /**
  //  *
  //  * @param productId
  //  * @param variant
  //  * @returns {Promise<*>}
  //  */
  // async saveVariant(productId, variant) {
  //   if (variant.id) {
  //     return await this.variant.updateById(variant.id, {...variant, product: productId})
  //   } else {
  //     return await this.variant.createVariant({...variant, product: productId})
  //   }
  // }
}
