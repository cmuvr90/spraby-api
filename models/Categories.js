import mongoose from "mongoose";
import Model from './index';

const FIELDS = {
  name: {type: String, required: true},
  handle: {type: String, required: true},
  title: {type: String, default: null},
  description: {type: String, default: null},
  image: {type: String, default: null},
  options: [
    {
      type: mongoose.Schema.Types.ObjectId, ref: "Options"
    }
  ]
};

const Categories = new Model(FIELDS);

export default mongoose.model('Categories', Categories);
