import mongoose from "mongoose";
import Model from './index';

const FIELDS = {
  image: {type: String, default: null},
  title: {type: String, default: null},
  values: [{type: String, default: null}]
};

const Variants = new Model(FIELDS);

export default mongoose.model('Variants', Variants);
