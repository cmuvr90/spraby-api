import fs from "fs";
import moment from 'moment';

export default class LogService {

  constructor(config) {
    this.withTerminal = config?.withTerminal ?? false;
    this.withDate = config?.withDate ?? false;
    this.logFolder = config?.logFolder ?? 'tmp/logs';
  }

  /**
   *
   * @param fileName
   * @param message
   * @returns {Promise<void>}
   */
  async info(fileName, message) {
    await this.writeLog(fileName, message);
  }

  /**
   *
   * @param fileName
   * @param message
   * @param code
   * @param errors
   * @returns {Promise<void>}
   */
  async error(fileName = '', message = '', code = '', errors = []) {
    const logMessage = `Message: ${message}; Code: ${code}; Error: ${errors.join(', ')}`
    await this.writeLog(fileName, logMessage);
  }

  /**
   *
   * @param fileName
   * @param value
   * @returns {Promise<void>}
   */
  async writeLog(fileName, value) {
    const logMessage = `${this._getDate()}` + value;
    await fs.appendFileSync(`${this.logFolder}/${fileName}.log`, logMessage + '\n');
    if (this.withTerminal) console.log(logMessage);
  }

  /**
   *
   * @returns {string|string}
   * @private
   */
  _getDate = () => this.withDate ? `[${moment().format()}] ` : '';

  /**
   *
   * @param name
   * @returns {{error: (function(*=, *=, *=): Promise<void>), info: (function(*=): Promise<void>)}}
   */
  createLogger(name = 'default') {
    return {
      info: message => this.info(name, message),
      error: (message, code, errors) => this.error(name, message, code, errors)
    };
  }
}
