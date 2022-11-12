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

Users.statics.ROLES = ROLES;

export default mongoose.model('Users', Users);
