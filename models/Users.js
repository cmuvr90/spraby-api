import mongoose from "mongoose";
import Model from './index';

const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  CUSTOMER: 'customer'
}

const FIELDS = {
  firstName: {type: String, default: null},
  lastName: {type: String, default: null},
  email: {type: String, default: null},
  role: {
    type: String,
    enum: Object.values(ROLES),
    default: ROLES.MANAGER,
  },
  activationLink: {type: String, default: null},
  password: {type: String, required: true},
};

const Users = new Model(FIELDS);

/**
 *
 * @returns {*}
 */
Users.methods.getId = function () {
  return `${this._id}`;
}

/**
 *
 * @returns {*}
 */
Users.methods.getFirstName = function () {
  return this.firstName;
}

/**
 *
 * @returns {*}
 */
Users.methods.getLastName = function () {
  return this.lastName;
}

/**
 *
 * @returns {*}
 */
Users.methods.getEmail = function () {
  return this.email;
}

/**
 *
 * @returns {*}
 */
Users.methods.getRole = function () {
  return this.role;
}

/**
 *
 * @returns {*}
 */
Users.methods.getPassword = function () {
  return this.password;
}

/**
 *
 * @param id
 * @returns {Promise<*>}
 */
Users.statics.getUserDtoById = async function (id) {
  return await this.getUserDto({_id: mongoose.Types.ObjectId(id)})
}

/**
 *
 * @param params
 * @returns {Promise<*>}
 */
Users.statics.getUsersDto = async function (params = {}) {
  const users = await this.find(params);
  return users?.map(i => this.getDto(i));
}

/**
 *
 * @param params
 * @returns {Promise<{firstName, lastName, role, id: *, email}|null>}
 */
Users.statics.getUserDto = async function (params = {}) {
  const user = await this.findOne(params);
  return user ? this.getDto(user) : null;
}

/**
 *
 * @param user
 * @returns {{firstName, lastName, role, id: *, email}}
 */
Users.statics.getDto = function (user) {
  return {
    id: user.getId(),
    firstName: user.getFirstName(),
    lastName: user.getLastName(),
    email: user.getEmail(),
    role: user.getRole(),
  }
}

/**
 *
 * @type {{MANAGER: string, CUSTOMER: string, ADMIN: string}}
 */
Users.statics.ROLES = ROLES;

export default mongoose.model('Users', Users);
