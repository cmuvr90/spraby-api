export default class ProductService {

  /**
   *
   * @param Product
   * @param ImageService
   * @param LogService
   */
  constructor(Product, ImageService, LogService) {
    this.product = Product;
    this.ImageService = ImageService;
    this.log = LogService.createLogger('ProductService');
  }

  /**
   *
   * @param productId
   * @param files
   * @returns {Promise<boolean>}
   */
  uploadAndSaveImages = async (productId, files) => {
    try {
      const product = await this.product.findById(productId);
      if (!product) throw Error(`Product ${productId} not found`);

      const path = `brand/${product.brand}/products/${product.getId()}/`;
      const {ids} = await this.ImageService.saveImages(files, path);

      if (ids?.length) {
        const imageIds = [...product.getImages(), ...ids]
        await this.product.updateById(productId, {images: imageIds});
      }

      return files?.length === ids?.length;
    } catch (e) {
      this.log.error(`[ProductService][uploadAndSaveImages] Error: ${e?.message || e}`)
      return false;
    }
  }

  /**
   *
   * @param count
   * @returns {Promise<[]>}
   */
  generate = async count => {
    try {
      const data = [];

      await this.log.info(`[generate] Error:`);

      while (count > 0) {
        const dataItem = await this.product.updateOrCreate({
          name: `Product name ${count}`,
          variants: [
            {
              name: `Variant 1 name ${count}`,
            },
            {
              name: `variant 2 name ${count}`,
            },
          ]
        })
        --count;
        data.push(dataItem);
      }

      return data;
    } catch (e) {
      await this.log.error(e, `[generate]`);

      console.log(e);
      return null;
    }
  }
}
