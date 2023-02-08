export default class MainError extends Error {

  constructor(code, message, errors = []) {
    super();
    this.code = code;
    this.message = message;
    this.errors = errors;
  }

  /**
   *
   */
  static unauthorizedError() {
    throw new this(401, 'Unauthorized', ['unauthorized']);
  }

  /**
   *
   * @param errors
   */
  static badRequestError(errors = []) {
    throw new this(400, 'Bad request' + `[${this.prototype.fileName}]`, Array.isArray(errors) ? errors : [errors]);
  }
}
