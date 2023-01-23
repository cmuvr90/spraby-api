export default class OptionService {

  /**
   *
   * @param Option
   * @param LogService
   */
  constructor(Option, LogService) {
    this.option = Option;
    this.log = LogService.createLogger('option_service');
  }
}
