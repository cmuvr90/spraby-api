import {TYPES} from '../../ioc/types';

class TestRunCommand {

  constructor(ioc) {
    this.ProductService = ioc.get(TYPES.ProductService);
  }

  /**
   *
   * @param params
   * @returns {Promise<void>}
   */
  async handle(params) {
    //
  }
}

export default TestRunCommand;
