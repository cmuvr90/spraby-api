import mongoose from "mongoose";
import Model from './index';

const FIELDS = {
  brandId: {type: mongoose.Schema.Types.ObjectId, ref: "Brands"},
  collectionId: {type: mongoose.Schema.Types.ObjectId, ref: "Collections"},
  imageId: {type: mongoose.Schema.Types.ObjectId, ref: "Images"},
  name: {type: String, default: null},
};

const Products = new Model(FIELDS);

export default mongoose.model('Products', Products);
