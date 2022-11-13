import {TYPES} from '../ioc/types';

export class Controller {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.user = req.body.user ?? null;
    this.log = this.getService(TYPES.LogService).createLogger('Controller');
  }

  /**
   *
   * @type {{SUCCESS: string, FAILED: string}}
   */
  static STATUSES = {
    FAILED: 'failed',
    SUCCESS: 'success'
  }

  /**
   *
   * @param name
   */
  getService = name => this.req.body.ioc.get(name);

  /**
   *
   */
  getQuery = () => this.req.query;

  /**
   *
   */
  getBody = () => this.req.body;

  /**
   *
   */
  getParams = () => this.req.params;

  /**
   *
   */
  getMethod = () => this.req.method;

  /**
   *
   */
  getUrl = () => this.req.url;

  /**
   *
   * @param e
   * @param code
   * @param isLog
   * @returns {*}
   */
  errorResponse = async (e, code = 406, isLog = true) => {
    const message = typeof e === 'string' ? e : e.message || e;
    if (isLog) {
      await this.logError(message, {QUERY: this.getQuery(), REQUEST_BODY: this.getBody()});
    }
    return this.res.status(code).send({status: Controller.STATUSES.FAILED, error: message});
  }

  /**
   *
   * @param data
   * @param isLog
   * @returns {*}
   */
  successResponse = async (data, isLog = false) => {
    if (isLog) await this.logInfo({QUERY: this.getQuery(), REQUEST_BODY: this.getBody(), RESPONSE: data});
    return this.res.status(200).send({status: Controller.STATUSES.SUCCESS, data});
  }

  /**
   *
   * @param e
   * @param data
   * @returns {Promise<void>}
   */
  async logError(e, data) {
    await this.log.error(e, `${this._getLogPrefix()} ${JSON.stringify(data, null, 2)}`);
  }

  /**
   *
   * @param data
   */
  async logInfo(data) {
    await this.log.info(`${this._getLogPrefix()} ${JSON.stringify(data, null, 2)}`);
  }

  /**
   *
   * @returns {string}
   * @private
   */
  _getLogPrefix = () => `[${this.getMethod()}][${this.getUrl()}]`;
}
