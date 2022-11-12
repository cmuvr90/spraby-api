import mongoose from "mongoose";
import Model from './index';

const FIELDS = {
  email: {
    type: String, default: null
  }
};

const Users = new Model(FIELDS);

export default mongoose.model('Users', Users);
