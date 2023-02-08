const jwt = require('jsonwebtoken');

export default class SessionService {

  /**
   *
   * @param Session
   * @param config
   * @param LogService
   */
  constructor(Session, config, LogService) {
    this.session = Session;
    this.jwtAccessSecret = config.jwtAccessSecret;
    this.jwtRefreshSecret = config.jwtRefreshSecret;
    this.log = LogService.createLogger('session_service');
  }

  /**
   *
   * @param payload
   * @param params
   * @returns {{accessToken: (*), refreshToken: (*)}}
   */
  generateJWTokens(payload = {}, params = {}) {
    const accessToken = jwt.sign(payload, this.jwtAccessSecret, params?.access ?? {expiresIn: '30s'})
    const refreshToken = jwt.sign(payload, this.jwtRefreshSecret, params?.refresh ?? {expiresIn: '15d'})
    return {accessToken, refreshToken}
  }

  /**
   *
   * @param payloadId
   * @param refreshToken
   * @returns {Promise<*>}
   */
  async saveJWToken(payloadId, refreshToken) {
    const session = await this.session.findOne({payloadId});
    if (session) {
      session.token = refreshToken;
      return await session.save();
    }
    return await this.session.create({payloadId});
  }
}
