import mongoose from "mongoose";
import Model from './index';

const FIELDS = {
  name: {type: String, default: null},
  title: {type: String, default: null},
  description: {type: String, default: null},
};

const Collections = new Model(FIELDS);

export default mongoose.model('Collections', Collections);
