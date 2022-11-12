import mongoose from "mongoose";
import Model from './index';

const FIELDS = {
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "Users"},
  imageId: {type: mongoose.Schema.Types.ObjectId, ref: "Images"},
  name: {type: String, default: null},
  description: {type: String, default: null},
};

const Brands = new Model(FIELDS);

export default mongoose.model('Brands', Brands);
