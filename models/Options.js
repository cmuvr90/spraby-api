import mongoose from "mongoose";
import Model from './index';

const TYPES = {
  SELECT: 'select',
  TEXT: 'text',
  COLOR: 'color'
}

const FIELDS = {
  type: {
    type: String,
    enum: Object.values(TYPES),
    default: TYPES.TEXT,
  },
  title: {type: String, default: null},
  name: {type: String, default: null},
  description: {type: String, default: null},
  value: {type: String, default: null},
};

const Options = new Model(FIELDS);

export default mongoose.model('Options', Options);
