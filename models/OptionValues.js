import mongoose from "mongoose";
import Model from './index';

const FIELDS = {
  optionId: {type: mongoose.Schema.Types.ObjectId, ref: "Options"},
  productId: {type: mongoose.Schema.Types.ObjectId, ref: "Products"},
  value: {type: String, default: null},
};

const OptionValues = new Model(FIELDS);

export default mongoose.model('OptionValues', OptionValues);
