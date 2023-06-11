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
    this.jwtAccessTokenMax = config.jwtAccessTokenMax;
    this.jwtRefreshSecret = config.jwtRefreshSecret;
    this.jwtRefreshTokenMax = config.jwtRefreshTokenMax;
    this.log = LogService.createLogger('session_service');
  }

  /**
   *
   * @param payload
   * @param params
   * @returns {{accessToken: (*), refreshToken: (*)}}
   */
  generateJWTokens(payload = {}, params = {}) {
    const accessToken = jwt.sign(payload, this.jwtAccessSecret, params?.access ?? {expiresIn: this.jwtAccessTokenMax})
    const refreshToken = jwt.sign(payload, this.jwtRefreshSecret, params?.refresh ?? {expiresIn: this.jwtRefreshTokenMax})
    return {accessToken, refreshToken}
  }

  /**
   *
   * @param token
   * @returns {null|*}
   */
  validateAccessToken(token) {
    try {
      return jwt.verify(token, this.jwtAccessSecret)
    } catch (e) {
      return null;
    }
  }

  /**
   *
   * @param token
   * @returns {null|*}
   */
  validateRefreshToken(token) {
    try {
      return jwt.verify(token, this.jwtRefreshSecret)
    } catch (e) {
      return null;
    }
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
    return await this.session.create({payloadId, token: refreshToken});
  }

  /**   *
   *
   * @returns {Promise<void>}
   */
  async removeByToken(token) {
    return await this.session.deleteOne({token});
  }
}
