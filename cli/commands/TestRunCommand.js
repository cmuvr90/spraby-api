import {TYPES} from '../../ioc/types';

class TestRunCommand {

  constructor(ioc) {
    this.FileService = ioc.get(TYPES.FileService);
  }

  /**
   *
   * @param params
   * @returns {Promise<void>}
   */
  async handle(params) {
    console.log('START TEST');
    const path = 'public/images/brands/123/products/568';

    // await this.FileService.createPathDirectories('public/images/brands/123/products');
    // await this.FileService.createPathDirectories('public/images/categories/265550');
    // await this.FileService.createPathDirectories('public/images/collections/65416');

    const response = await this.FileService.removePathEmptyDirectories('public/images/categories/265550');
    // console.log('response === ', response);
    console.log('END TEST');
  }
}

export default TestRunCommand;
