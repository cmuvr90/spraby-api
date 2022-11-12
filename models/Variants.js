import mongoose from "mongoose";
import Model from './index';

const FIELDS = {
  productId: {type: mongoose.Schema.Types.ObjectId, ref: "Products"},
  imageId: {type: mongoose.Schema.Types.ObjectId, ref: "Images"},
  name: {type: String, default: null},
};

const Variants = new Model(FIELDS);

export default mongoose.model('Variants', Variants);
