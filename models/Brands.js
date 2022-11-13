import mongoose from "mongoose";
import Model from './index';

const FIELDS = {
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "Users"},
  image: {type: String, default: null},
  name: {type: String, default: null},
  description: {type: String, default: null},
};

const Brands = new Model(FIELDS);

export default mongoose.model('Brands', Brands);
