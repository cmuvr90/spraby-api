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

Users.virtual('brands', {
  ref: 'Brands',
  localField: '_id',
  foreignField: 'user'
});

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
 * @returns {*}
 */
Users.methods.isManager = function () {
  return this.getRole() === ROLES.MANAGER;
}

/**
 *
 * @returns {*}
 */
Users.methods.isAdmin = function () {
  return this.getRole() === ROLES.ADMIN;
}

/**
 *
 * @param queryParams
 * @returns {Promise<*>}
 */
Users.statics.getUsersJsonById = async function (queryParams = {}) {
  let params = {role: {$ne: 'admin'}};

  if (queryParams?.query?.length) {
    params.$or = ['firstName', 'lastName', 'email'].map(i => ({
      firstName: {
        $regex: `${queryParams?.query}`.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        $options: 'i'
      }
    }));
  }

  const query = this.find(params);

  if (queryParams.hasOwnProperty('page')) {
    const limit = +(queryParams['limit'] ?? 10);
    const count = await this.countDocuments(params);
    const page = +queryParams.page;
    const pages = limit > 0 ? Math.ceil(count / +limit) : 0;

    query.skip(limit * (page - 1)).limit(limit);

    return {
      items: await query,
      paginator: {
        count,
        pages,
        page,
        next: page < pages,
        prev: page > 1
      }
    }
  } else {
    return await query;
  }
}

/**
 *
 * @param id
 * @returns {Promise<*>}
 */
Users.statics.getUserJsonById = async function (id) {
  return await this.findOne({_id: new mongoose.Types.ObjectId(id)}).populate('brands');
}

/**
 *
 * @param email
 * @returns {Promise<*>}
 */
Users.statics.getUserJsonByEmail = async function (email) {
  return await this.findOne({email}).populate('brands');
}

/**
 *
 * @param params
 * @returns {Promise<data>}
 */
Users.statics.createUser = async function (params) {
  const data = {
    firstName: params.firstName,
    lastName: params.lastName,
    email: params.email,
    role: params.role,
    password: params.password,
  }
  return this.create(data)
}

/**
 *
 * @type {{MANAGER: string, CUSTOMER: string, ADMIN: string}}
 */
Users.statics.ROLES = ROLES;

export default mongoose.model('Users', Users);
