import mongoose from "mongoose";
import Model from './index';
import Options from './Options';
import Products from './Products';

const VALUE_FIELDS = {
  option: {type: mongoose.Schema.Types.ObjectId, ref: Options},
  value: {type: String, required: true},
  position: {type: Number, required: true}
}
const Values = new Model(VALUE_FIELDS, {timestamps: false});

const FIELDS = {
  product: {type: mongoose.Schema.Types.ObjectId, ref: 'Products'},
  image: {type: String, default: null},
  title: {type: String, default: null},
  values: [Values]
};

const Variants = new Model(FIELDS);

/**
 *
 * @param params
 * @returns {Promise<data>}
 */
Variants.statics.createVariant = async function (params) {
  const data = {
    product: params.product,
    image: params?.image ?? null,
    title: params?.values.map(i => i.value).join('/'),
    values: params?.values ?? []
  }
  return this.create(data)
}
export default mongoose.model('Variants', Variants);
