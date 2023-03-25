import mongoose from "mongoose";
import Model from './index';
import Brands from './Brands';
import Categories from './Categories';
import Variants from './Variants';
import {getHandle} from '../services/utilites';

const FIELDS = {
  brand: {type: mongoose.Schema.Types.ObjectId, ref: Brands, required: 'Brand is required',},
  category: {type: mongoose.Schema.Types.ObjectId, ref: Categories, required: 'Category is required'},
  title: {type: String, required: 'Title is required'},
  handle: {type: String, required: 'Handle is required'},
  description: {type: String, default: null},
  image: {type: String, default: null},
  variants: [
    {type: mongoose.Schema.Types.ObjectId, ref: Variants}
  ]
};

const Products = new Model(FIELDS);

//VALIDATIONS
Products.path('handle').validate(async function (value) {
  try {
    let handle = value;
    const DELIMITER = '_';

    const product = await mongoose.model('Products')
    .findOne({$or: [{handle: new RegExp(`^(${value})(${DELIMITER}\\d*)$`, 'i')}, {handle: value}]})
    .sort({createdAt: -1})
    .select({handle: 1});

    if (product?.handle?.length) {
      const matched = product?.handle.match(new RegExp(`(${DELIMITER}\\d*)$`));
      if (matched && matched[0]?.length && Number.isInteger(+matched[0].replace('_', ''))) {
        handle = handle + DELIMITER + (+matched[0].replace('_', '') + 1);
      } else {
        handle = `${handle}_1`;
      }
    }
    this.handle = handle;
    return true;
  } catch (e) {
    return false
  }
}, 'Handle has been unique');

//HOOKS
Products.pre('validate', {document: true, query: true}, async function (next) {
  if (!this?.handle?.length) this.handle = getHandle(this.title);
  next();
});

Products.pre('deleteOne', {document: true, query: true}, async function () {
  const product = await this.model.findOne(this.getQuery());
  if (product?.variants) await Variants.deleteMany({_id: {$in: product.variants}})
});

//METHODS

/**
 *
 * @returns {*}
 */
Products.methods.getId = function () {
  return `${this._id}`;
}

/**
 *
 * @returns {*}
 */
Products.methods.getCategory = function () {
  return this.category;
}

/**
 *
 * @returns {*}
 */
Products.methods.getTitle = function () {
  return this.title;
}

/**
 *
 * @returns {*}
 */
Products.methods.getHandle = function () {
  return this.handle;
}

/**
 *
 * @returns {*}
 */
Products.methods.getDescription = function () {
  return this.description;
}

/**
 *
 * @returns {*}
 */
Products.methods.getImage = function () {
  return this.image;
}

/**
 *
 * @returns {*}
 */
Products.methods.getVariants = function () {
  return this.variants;
}

/**
 *
 * @param id
 * @returns {Promise<*>}
 */
Products.statics.getProductDtoById = async function (id) {
  return await this.getProductDto({_id: new mongoose.Types.ObjectId(id)})
}

/**
 *
 * @param handle
 * @returns {Promise<*>}
 */
Products.statics.getProductDtoByHandle = async function (handle) {
  return await this.getProductDto({handle})
}

/**
 *
 * @param params
 * @returns {*|null}
 */
Products.statics.getProductDto = async function (params = {}) {
  const product = await this.findOne(params).populate([{path: 'category', populate: 'options'}, {path: 'variants'}]);
  return product ? this.getDto(product) : null;
}

/**
 *
 * @param params
 * @returns {*|null}
 */
Products.statics.getProductsDto = async function (params = {}) {
  const products = await this.find(params).populate([{path: 'category', populate: 'options'}, {path: 'variants'}]);
  return products?.map(i => this.getDto(i));
}

/**
 *
 * @param product
 * @returns {{image: *, description: *, handle: *, id: *, variants, title: *, category: *}}
 */
Products.statics.getDto = function (product) {
  return {
    id: product.getId(),
    handle: product.getHandle(),
    title: product.getTitle(),
    description: product.getDescription(),
    category: Categories.getDto(product.getCategory()),
    image: product.getImage(),
    variants: product.getVariants(),
  }
}

/**
 *
 * @param params
 * @returns {Promise<data>}
 */
Products.statics.createProduct = async function (params) {
  const data = {
    title: params.title,
    brand: params.brand,
    description: params.description,
    category: params.category,
    image: params.image,
  }
  return this.create(data)
}

/**
 *
 * @param productId
 * @param variantIds
 * @returns {Promise<*>}
 */
Products.statics.addVariants = async function (productId, variantIds) {
  const product = await this.findById(productId);
  if (!product) return;
  product.variants = Array.from(new Set(product.variants.map(i => `${i}`).concat(variantIds.map(i => `${i}`)))).map(i => new mongoose.Types.ObjectId(i))
  return await product.save();
}

export default mongoose.model('Products', Products);
