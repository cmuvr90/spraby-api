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
  return await this.getProductDto({_id: mongoose.Types.ObjectId(id)})
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

export default mongoose.model('Products', Products);
