import bcrypt from 'bcrypt';
import LoginError from '../ErrorService/LoginError';

export default class UserService {

  /**
   *
   * @param User
   * @param SessionService
   * @param LogService
   */
  constructor(User, SessionService, LogService) {
    this.user = User;
    this.sessionService = SessionService;
    this.log = LogService.createLogger('UserService');
  }

  /**
   *
   * @param user
   * @returns {{role, name: any, id: *, email}}
   */
  getUserDto(user) {
    return {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      role: user.getRole()
    };
  }

  async login(email = null, password = null) {
    if (!email || !password) LoginError.badRequestError('Email and password are required');

    const user = await this.user.findOne({email});
    if (!user) LoginError.badRequestError('Email or password is invalid');

    const isEquals = await this.isEqualsPasswords(password, user.getPassword());
    if (!isEquals) LoginError.badRequestError('Email or password is invalid');

    const tokens = this.getUserJWTokens(user);
    return {...tokens, user: this.getUserDto(user)}
  }

  /**
   *
   * @param password
   * @param userPassword
   * @returns {Promise<*>}
   */
  async isEqualsPasswords(password, userPassword) {
    return await bcrypt.compare(password, userPassword);
  }

  /**
   *
   * @param user
   * @returns {Promise<{tokens: {accessToken: *, refreshToken: *}}>}
   */
  async getUserJWTokens(user) {
    const tokens = this.sessionService.generateJWTokens(this.getUserDto(user));
    await this.sessionService.saveJWToken(user.getId(), tokens.refreshToken);
    return {tokens};
  }
}
