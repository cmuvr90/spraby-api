import mongoose from "mongoose";
import Model from './index';
import Categories from './Categories';

const FIELDS = {
  name: {type: String, required: true},
  handle: {type: String, required: true},
  title: {type: String, default: null},
  description: {type: String, default: null},
  image: {type: String, default: null},
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId, ref: Categories
    }
  ]
};

const Collections = new Model(FIELDS);

export default mongoose.model('Collections', Collections);
