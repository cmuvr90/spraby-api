import mongoose from "mongoose";
import Model from './index';

const FIELDS = {
  name: {type: String, default: null},
  title: {type: String, default: null},
  description: {type: String, default: null},
};

const Categories = new Model(FIELDS);

export default mongoose.model('Categories', Categories);
