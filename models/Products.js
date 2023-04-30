import mongoose from "mongoose";
import Model from './index';
import Brands from './Brands';
import Categories from './Categories';
import Images from './Images';
import Variants from './schemas/Variants';

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
 * @param id
 * @returns {Promise<*>}
 */
Products.methods.deleteVariant = async function (id) {
  this.variants = this.variants.filter(v => `${v.id}` !== `${id}`)
  return await this.save();
}

/**
 *
 * @param params
 * @returns {Promise<*>}
 */
Products.methods.addVariant = async function (params) {
  this.variants = [...this.variants, params];
  return await this.save();
}

/**
 *
 * @param variantId
 * @param params
 * @returns {Promise<*>}
 */
Products.methods.updateVariant = async function (variantId, params) {
  this.variants = this.variants.map(v => `${v.id}` === `${variantId}` ? {...v, ...params} : {...v})
  return await this.save();
}

//STATIC

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
    },
    {
      path: 'variants.image'
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
    },
    {
      path: 'variants.image'
    }
  ]);
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

export default mongoose.model('Products', Products);
