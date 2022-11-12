export default class UserService {

  /**
   *
   * @param User
   * @param LogService
   */
  constructor(User, LogService) {
    this.user = User;
    this.log = LogService.createLogger('user_service');
  }

  /**
   *
   * @param count
   * @returns {Promise<[]>}
   */
  generate = async count => {
    const data = [];
    while (count > 0) {
      const dataItem = await this.user.updateOrCreate({email: `emailUser${count}@gmail.com`})
      --count;
      data.push(dataItem);
    }

    return data;
  }
}
