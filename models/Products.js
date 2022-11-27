import mongoose from "mongoose";
import Model from './index';
import Brands from './Brands';
import Categories from './Categories';
import Variants from './Variants';

const FIELDS = {
  brand: {type: mongoose.Schema.Types.ObjectId, ref: Brands},
  category: {type: mongoose.Schema.Types.ObjectId, ref: Categories},
  title: {type: String, required: true},
  handle: {type: String, required: true},
  description: {type: String, default: null},
  image: {type: String, default: null},
  variants: [
    {type: mongoose.Schema.Types.ObjectId, ref: Variants}
  ]
};

const Products = new Model(FIELDS);

export default mongoose.model('Products', Products);
