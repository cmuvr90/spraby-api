import mongoose from "mongoose";
import Model from './index';
import Brands from './Brands';
import Categories from './Categories';
import Variants from './Variants';
import Images from './Images';
import {getHandle} from '../services/utilites';

const FIELDS = {
  brand: {type: mongoose.Schema.Types.ObjectId, ref: Brands, default: null},
  category: {type: mongoose.Schema.Types.ObjectId, ref: Categories, default: null},
  title: {type: String, required: 'Title is required'},
  handle: {type: String, required: 'Handle is required', unique: true},
  description: {type: String, default: null},
  images: [
    {type: mongoose.Schema.Types.ObjectId, ref: Images}
  ],
  variants: [
    {type: mongoose.Schema.Types.ObjectId, ref: Variants}
  ]
};

const Products = new Model(FIELDS);

//VALIDATIONS
// Products.path('handle').validate(async function (value) {
//   // try {
//   //   let handle = value;
//   //   const DELIMITER = '_';
//   //
//   //   const product = await mongoose.model('Products')
//   //   .findOne({$or: [{handle: new RegExp(`^(${value})(${DELIMITER}\\d*)$`, 'i')}, {handle: value}]})
//   //   .sort({createdAt: -1})
//   //   .select({handle: 1});
//   //
//   //   if (product?.handle?.length) {
//   //     const matched = product?.handle.match(new RegExp(`(${DELIMITER}\\d*)$`));
//   //     if (matched && matched[0]?.length && Number.isInteger(+matched[0].replace('_', ''))) {
//   //       handle = handle + DELIMITER + (+matched[0].replace('_', '') + 1);
//   //     } else {
//   //       handle = `${handle}_1`;
//   //     }
//   //   }
//   //   this.handle = handle;
//   //   return true;
//   // } catch (e) {
//   //   return false
//   // }
//   // return false
//
//   this.handle = value;
// }, 'Handle has been unique');

//HOOKS
Products.pre('validate', {document: true, query: true}, async function (next) {
  if (!this?.handle?.length) this.handle = getHandle(this.title);
  next();
});

Products.pre('deleteOne', {document: true, query: true}, async function () {
  const product = await this.model.findOne(this.getQuery());
  if (product?.variants) await Variants.deleteMany({_id: {$in: product.variants}})
  if (product?.images) await Images.deleteMany({_id: {$in: product.images}})
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
Products.methods.getImages = function () {
  return this.images;
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
  const product = await this.findOne(params).populate([{
    path: 'category',
    populate: 'options'
  }, {path: 'variants'}, {path: 'images'}]);
  return product ? this.getDto(product) : null;
}

/**
 *
 * @param params
 * @returns {*|null}
 */
Products.statics.getProductsDto = async function (params = {}) {
  const products = await this.find(params).populate([{
    path: 'category',
    populate: 'options'
  }, {path: 'variants'}, {path: 'images'}]);
  return products?.map(i => this.getDto(i));
}

/**
 *
 * @param product
 * @returns {{images, description: *, handle: *, id: *, variants, title: *, category: *}}
 */
Products.statics.getDto = function (product) {
  return {
    id: product.getId(),
    handle: product.getHandle(),
    title: product.getTitle(),
    description: product.getDescription(),
    category: Categories.getDto(product.getCategory()),
    images: product.getImages().map(i => Images.getDto(i)),
    variants: product.getVariants().map(v => Variants.getDto(v)),
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

/**
 *
 */
Products.statics.updateVariantsIds = async function (productId) {
  const variants = await Variants.find({product: new mongoose.Types.ObjectId(productId)});
  return await this.updateById(productId, {variants: variants.map(i => i._id)})
}

export default mongoose.model('Products', Products);
