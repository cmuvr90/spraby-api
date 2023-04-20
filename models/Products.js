import mongoose from "mongoose";
import Model from './index';
import Brands from './Brands';
import Categories from './Categories';
import Images from './Images';
import Variants from './schemas/Variants';
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
  variants: [Variants]
};

const Products = new Model(FIELDS, {
  timestamps: true,
  toObject: {virtuals: true},
  toJSON: {virtuals: true}
});

//HOOKS
Products.pre('validate', {document: true, query: true}, async function (next) {
  if (!this?.handle?.length) this.handle = getHandle(this.title);
  next();
});

Products.pre('deleteOne', {document: true, query: true}, async function () {
  const product = await this.model.findOne(this.getQuery());
  if (product?.images) await Images.deleteMany({_id: {$in: product.images}})
});


Products.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
    if (!!ret?.category?.options?.length) delete ret.category.options
  }
});

Products.set('toObject', {
  virtuals: true
});

/**
 *
 */
Products.virtual('id').get(function () {
  return `${this._id}`;
});

/**
 *
 */
Products.virtual('options').get(function () {
  return this.category?.options ?? [];
});


//METHODS

/**
 *
 * @returns {*}
 */
Products.methods.getId = function () {
  return this._id;
}

/**
 *
 * @returns {*}
 */
Products.methods.getBrand = function () {
  return this.brand;
}

/**
 *
 * @returns {*}
 */
Products.methods.getCategory = function () {
  return this.categoryId;
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
 * @returns {Promise<*>}
 */
Products.statics.getProductsJsonById = async function () {
  return await this.find().populate([
    {
      path: 'category',
      populate: 'options'
    },
    {
      path: 'brand'
    },
    {
      path: 'images'
    }
  ]);
}

/**
 *
 * @param id
 * @returns {Promise<*|null>}
 */
Products.statics.getProductJsonById = async function (id) {
  return await this.findOne({_id: new mongoose.Types.ObjectId(id)}).populate([
    {
      path: 'category',
      populate: 'options'
    },
    {
      path: 'brand'
    },
    {
      path: 'images'
    }
  ]);
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
