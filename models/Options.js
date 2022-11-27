import mongoose from "mongoose";
import Model from './index';

const TYPES = {
  TEXT: 'text',
  COLOR: 'color'
}

const FIELDS = {
  type: {
    type: String,
    enum: Object.values(TYPES),
    default: TYPES.TEXT,
  },
  name: {type: String, required: true},
  key: {type: String, required: true},
  title: {type: String, required: true},
  description: {type: String, default: null},
  values: [{type: String, required: true}]
};

const Options = new Model(FIELDS);

Options.statics.TYPES = TYPES;

export default mongoose.model('Options', Options);
