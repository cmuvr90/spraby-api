import mongoose from "mongoose";
import Model from './index';
import Users from './Users';
import Categories from './Categories';

const FIELDS = {
  user: {type: mongoose.Schema.Types.ObjectId, ref: Users},
  image: {type: String, default: null},
  name: {type: String, default: null},
  description: {type: String, default: null},
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId, ref: Categories
    }
  ]
};

const Brands = new Model(FIELDS);

export default mongoose.model('Brands', Brands);
