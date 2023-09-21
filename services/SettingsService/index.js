export default class SettingsService {
  
  /**
   *
   * @param Navigation
   * @param Settings
   * @param LogService
   */
  constructor(Navigation, Settings, LogService) {
    this.navigation = Navigation;
    this.settings = Settings;
    this.log = LogService.createLogger('SettingsService');
  }
}
