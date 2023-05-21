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

const Users = new Model(FIELDS, {
  timestamps: true,
  toObject: {virtuals: true},
  toJSON: {virtuals: true}
});

Users.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    delete ret.activationLink;
  }
});

Users.set('toObject', {
  virtuals: true
});

/**
 *
 */
Users.virtual('id').get(function () {
  return `${this._id}`;
});

/**
 *
 * @returns {*}
 */
Users.methods.getId = function () {
  return this._id;
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
 * @returns {Promise<*>}
 */
Users.statics.getUsersJsonById = async function (ids = []) {

  const params = ids?.length ? {
    _id: {$in: ids.map(i => new mongoose.Types.ObjectId(i))}
  } : {};

  return await this.find(params);
}

/**
 *
 * @param id
 * @returns {Promise<*>}
 */
Users.statics.getUserJsonById = async function (id) {
  return await this.findOne({_id: new mongoose.Types.ObjectId(id)});
}

/**
 *
 * @type {{MANAGER: string, CUSTOMER: string, ADMIN: string}}
 */
Users.statics.ROLES = ROLES;

export default mongoose.model('Users', Users);
