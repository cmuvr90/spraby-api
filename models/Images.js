import mongoose from "mongoose";
import Model from './index';

const FIELDS = {
  src: {type: String, default: null},
  alt: {type: String, default: null},
};

const Images = new Model(FIELDS);

export default mongoose.model('Images', Images);
