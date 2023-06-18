import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';
import LoginError from '../ErrorService/LoginError';
import RegisterError from '../ErrorService/RegisterError';
import AuthError from '../ErrorService/AuthError';
import PassportService from '../PassportService';

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
   * @param email
   * @param password
   * @returns {Promise<{accessToken: *, user: *, refreshToken: *}>}
   */
  async login(email, password) {
    const user = await this.user.findOne({email});
    if (!user) LoginError.badRequestError('Email or password is invalid');

    const isCompare = await bcrypt.compare(password, user.getPassword());
    if (!isCompare) LoginError.badRequestError('Email or password is invalid');

    return {token: PassportService.generateToken({id: user.toJSON()})}

    // const user = await this.user.findOne({email});
    // if (!user) LoginError.badRequestError('Email or password is invalid');
    //
    // const isEquals = await this.isEqualsPasswords(password, user.getPassword());
    // if (!isEquals) LoginError.badRequestError('Email or password is invalid');
    //
    // const tokens = await this.getUserJWTokens(user);
    // return {...tokens, user: user.toJSON()}
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
   * @param params
   * @returns {Promise<*>}
   */
  async createUser(params) {
    const hashPassword = await bcrypt.hash(params.password, 3);

    return await this.user.createUser({
      firstName: params.firstName,
      lastName: params.lastName,
      email: params.email,
      role: this.user.ROLES.MANAGER,
      password: hashPassword
    });
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

    const tokens = this.sessionService.generateJWTokens({...user.toJSON()});
    await this.sessionService.saveJWToken(user.getId(), tokens.refreshToken);

    return {...tokens, user: user.toJSON()}
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

    const tokens = this.sessionService.generateJWTokens({...user.toJSON()});
    await this.sessionService.saveJWToken(user.getId(), tokens.refreshToken);

    return {...tokens, user: user.toJSON()}
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

    return user ? user.toJSON() : null
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
    const tokens = this.sessionService.generateJWTokens(user.toJSON());
    await this.sessionService.saveJWToken(user.getId(), tokens.refreshToken);
    return {...tokens};
  }
}
