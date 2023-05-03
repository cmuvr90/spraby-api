export default class SettingsService {
  /**
   *
   * @param Navigation
   * @param LogService
   */
  constructor(Navigation, LogService) {
    this.navigation = Navigation;
    this.log = LogService.createLogger('SettingsService');
  }
}
