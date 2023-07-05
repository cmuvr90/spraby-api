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
Products.statics.getProductsJsonById = async function (ids = []) {

  const params = ids?.length ? {
    _id: {$in: ids.map(i => new mongoose.Types.ObjectId(i))}
  } : {};

  return await this.find(params).populate([
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
    handle: getHandle(params.title),
    description: params.description,
    category: params.category,
  }
  return this.create(data)
}

/**
 *
 * @param productId
 * @param params
 * @returns {Promise<*>}
 */
Products.statics.updateProduct = async function (productId, params) {
  const data = {};

  if (typeof params?.title !== 'undefined') data['title'] = params.title;
  if (typeof params?.description !== 'undefined') data['description'] = params.description;
  if (typeof params?.category !== 'undefined') data['category'] = new mongoose.Types.ObjectId(params.category);

  return this.updateOne({_id: new mongoose.Types.ObjectId(productId)}, data)
}

/**
 *
 * @param params
 * @returns {Promise<Promise<*>|*[]>}
 */
Products.statics.getProductsByParams = async function (params) {
  const categories = params.categories ?? [];
  const options = params?.options ?? null;

  const match = options?.length ? {
    $or: options.map(i => ({
      $and: [
        {'variants.values.option': new mongoose.Types.ObjectId(i.optionId)},
        {'variants.values.value': {$in: i.values}}
      ]
    }))
  } : {};

  const products = await this.aggregate([
    {
      $match: match
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
        pipeline: [
          {
            $match: {$expr: {$in: ["$_id", categories.map(id => new mongoose.Types.ObjectId(id))]}}
          }
        ]
      }
    },
    {
      $unwind: "$category"
    },
    {
      $project: {
        "_id": 1
      }
    }
  ]).exec();
  const productIds = products.map(i => i._id);
  return productIds?.length ? this.getProductsJsonById(productIds) : [];
}

export default mongoose.model('Products', Products);
