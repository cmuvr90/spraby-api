export default class ProductService {

  /**
   *
   * @param Product
   * @param LogService
   */
  constructor(Product, LogService) {
    this.product = Product;
    this.log = LogService.createLogger('ProductService');
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
