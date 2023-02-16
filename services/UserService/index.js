import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';
import LoginError from '../ErrorService/LoginError';
import RegisterError from '../ErrorService/RegisterError';
import AuthError from '../ErrorService/AuthError';

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

  /**
   *
   * @param email
   * @param password
   * @returns {Promise<{readonly [Symbol.toStringTag]: string, finally: {<U>(onFinally?: () => (Promise<U> | U)): Promise<U>, (onfinally?: ((() => void) | undefined | null)): Promise<{tokens: {accessToken: *, refreshToken: *}}>}, then<TResult1={tokens: {accessToken: *, refreshToken: *}}, TResult2=never>(onfulfilled?: (((value: {tokens: {accessToken: *, refreshToken: *}}) => (PromiseLike<TResult1> | TResult1)) | undefined | null), onrejected?: (((reason: any) => (PromiseLike<TResult2> | TResult2)) | undefined | null)): Promise<TResult1 | TResult2>, catch<TResult=never>(onrejected?: (((reason: any) => (PromiseLike<TResult> | TResult)) | undefined | null)): Promise<{tokens: {accessToken: *, refreshToken: *}} | TResult>, user: {role, name: *, id: *, email}}>}
   */
  async login(email, password) {
    const user = await this.user.findOne({email});
    if (!user) LoginError.badRequestError('Email or password is invalid');

    const isEquals = await this.isEqualsPasswords(password, user.getPassword());
    if (!isEquals) LoginError.badRequestError('Email or password is invalid');

    const tokens = await this.getUserJWTokens(user);
    return {...tokens, user: this.getUserDto(user)}
  }

  /**
   *
   * @param refreshToken
   * @returns {Promise<*>}
   */
  async logout(refreshToken) {
    return await this.sessionService.removeByToken(refreshToken)
  }

  /**
   *
   * @param email
   * @param password
   * @returns {Promise<{accessToken: *, user: {role, name: *, id: *, email}, refreshToken: *}>}
   */
  async register(email, password) {
    let user = await this.user.findOne({email});
    if (user) RegisterError.badRequestError('User with this email is exist');

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuidv4();

    user = await this.user.create({email, password: hashPassword, activationLink});

    const userDto = this.getUserDto(user);
    const tokens = this.sessionService.generateJWTokens({...userDto});
    await this.sessionService.saveJWToken(user.getId(), tokens.refreshToken);

    return {...tokens, user: userDto}
  }

  /**
   *
   * @param refreshToken
   * @returns {Promise<{accessToken: *, user: {role, name: *, id: *, email}, refreshToken: *}>}
   */
  async refresh(refreshToken) {
    if (!refreshToken) throw AuthError.unauthorizedError();

    const userData = this.sessionService.validateRefreshToken(refreshToken);
    const tokenFromDB = await this.sessionService.session.findOne({token: refreshToken});

    if (!userData || !tokenFromDB) throw AuthError.unauthorizedError();

    const user = await this.user.findById(userData.id);

    const userDto = this.getUserDto(user);
    const tokens = this.sessionService.generateJWTokens({...userDto});
    await this.sessionService.saveJWToken(user.getId(), tokens.refreshToken);

    return {...tokens, user: userDto}
  }

  /**
   *
   * @param refreshToken
   * @returns {Promise<void>}
   */
  async getAuthUser(refreshToken) {
    if (!refreshToken) return null;

    const userData = this.sessionService.validateRefreshToken(refreshToken);
    const tokenFromDB = await this.sessionService.session.findOne({token: refreshToken});

    if (!userData || !tokenFromDB) return null;

    const user = await this.user.findById(userData.id);

    return user ? this.getUserDto(user) : null
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
   * @returns {Promise<{accessToken: *, refreshToken: *}>}
   */
  async getUserJWTokens(user) {
    const tokens = this.sessionService.generateJWTokens(this.getUserDto(user));
    await this.sessionService.saveJWToken(user.getId(), tokens.refreshToken);
    return {...tokens};
  }
}
