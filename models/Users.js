import mongoose from "mongoose";
import Model from './index';

const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  CUSTOMER: 'customer'
}

const FIELDS = {
  name: {type: String, default: null},
  lastName: {type: String, default: null},
  email: {type: String, default: null},
  role: {
    type: String,
    enum: Object.values(ROLES),
    default: ROLES.MANAGER,
  },
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
Users.methods.getName = function () {
  return this.name;
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
 * @type {{MANAGER: string, CUSTOMER: string, ADMIN: string}}
 */
Users.statics.ROLES = ROLES;

export default mongoose.model('Users', Users);
