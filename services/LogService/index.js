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
   * @param name
   * @param message
   * @returns {Promise<void>}
   */
  async info(name, message) {
    await this.writeLog(name, `${name}-INFO`, message);
  }

  /**
   *
   * @param name
   * @param message
   * @param e
   * @returns {Promise<void>}
   */
  async error(name, message, e = null) {
    const errorMessage = e ? ` Error: ${e.message || e}` : '';
    const logMessage = `${message}${errorMessage}`;
    await this.writeLog(name, `${name}-ERROR`, logMessage);
  }

  /**
   *
   * @param name
   * @param fileName
   * @param value
   * @returns {Promise<void>}
   */
  async writeLog(name, fileName, value) {
    const logMessage = `${this._getDate()}[${name}]` + value;
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
   * @returns {{error: (function(*=, *=): Promise<void>), info: (function(*=): Promise<void>)}}
   */
  createLogger(name = 'default') {
    return {
      info: message => this.info(name, message),
      error: (e, message) => this.error(name, message, e)
    };
  }
}
