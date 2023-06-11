import permissions from '../../config/permissions';

export default class PermissionService {

  /**
   *
   * @param UserService
   * @param LogService
   */
  constructor(UserService, LogService) {
    this.UserService = UserService;
    this.log = LogService.createLogger('PermissionService');
  }

  /**
   *
   * @param req
   * @returns {boolean|void}
   */
  check(req) {
    const user = req.user;
    if (!user) return false;
    if (user.role === 'manager') return this.chekManager(req);
    if (user.role === 'admin') return this.chekAdmin(req);
    return false;
  }

  /**
   *
   * @param req
   */
  chekManager(req) {
    const queryScope = PermissionService.getQueryScope(req.path, req.method);
    const scopes = this.getManagerPermissions();
    return scopes.includes(queryScope);
  }

  /**
   *
   * @param req
   */
  chekAdmin(req) {
    const queryScope = PermissionService.getQueryScope(req.path, req.method);
    const scopes = this.getAdminPermissions();
    return scopes.includes(queryScope);
  }

  /**
   *
   * @returns {(string)[]}
   */
  getAdminPermissions() {
    return [
      permissions.BRANDS_READ,
      permissions.BRANDS_WRITE,
      permissions.CATEGORIES_READ,
      permissions.CATEGORIES_WRITE,
      permissions.COLLECTIONS_READ,
      permissions.COLLECTIONS_WRITE,
      permissions.NAVIGATIONS_READ,
      permissions.NAVIGATIONS_WRITE,
      permissions.OPTIONS_READ,
      permissions.OPTIONS_WRITE,
      permissions.USERS_READ,
      permissions.USERS_WRITE
    ]
  }

  /**
   *
   * @returns {(string)[]}
   */
  getManagerPermissions() {
    return [
      permissions.CATEGORIES_READ,
      permissions.PRODUCTS_WRITE,
      permissions.PRODUCTS_READ
    ];
  }

  /**
   *
   * @param path
   * @param method
   * @returns {string|null}
   */
  static getQueryScope(path, method) {
    try {
      const resourceName = path.split('/')[1];
      const type = method.toLowerCase() === 'get' ? 'read' : 'write';
      return `${resourceName}_${type}`
    } catch (e) {
      return null;
    }
  }
}
