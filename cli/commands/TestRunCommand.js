import {TYPES} from '../../ioc/types';

class TestRunCommand {

  constructor(ioc) {
    this.UserService = ioc.get(TYPES.UserService);
  }

  /**
   *
   * @param params
   * @returns {Promise<void>}
   */
  async handle(params) {

      console.log('params = ', params);
      const users = await this.UserService.user.get();
      console.log(users);
  }
}

export default TestRunCommand;
