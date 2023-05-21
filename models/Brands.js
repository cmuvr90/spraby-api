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

const Brands = new Model(FIELDS, {
  timestamps: true,
  toObject: {virtuals: true},
  toJSON: {virtuals: true}
});

Brands.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
  }
});

/**
 *
 */
Brands.virtual('id').get(function () {
  return `${this._id}`;
});

/**
 *
 * @returns {*}
 */
Brands.methods.getId = function () {
  return this._id;
}

/**
 *
 * @returns {*}
 */
Brands.methods.getUser = function () {
  return this.user;
}

/**
 *
 * @returns {*}
 */
Brands.methods.getImage = function () {
  return this.image;
}

/**
 *
 * @returns {*}
 */
Brands.methods.getName = function () {
  return this.name;
}

/**
 *
 * @returns {*}
 */
Brands.methods.getDescription = function () {
  return this.description;
}

/**
 *
 * @returns {*}
 */
Brands.methods.getCategories = function () {
  return this.categories;
}

/**
 *
 * @returns {Promise<*>}
 */
Brands.statics.getBrandsJsonById = async function (ids = []) {

  const params = ids?.length ? {
    _id: {$in: ids.map(i => new mongoose.Types.ObjectId(i))}
  } : {};

  return await this.find(params).populate([{
    path: 'categories'
  }]);
}

/**
 *
 * @param id
 * @returns {Promise<*|null>}
 */
Brands.statics.getBrandJsonById = async function (id) {
  return await this.findOne({_id: new mongoose.Types.ObjectId(id)}).populate([{
    path: 'categories'
  }]);
}

/**
 *
 * @param params
 * @returns {Promise<data>}
 */
Brands.statics.createBrand = async function (params) {
  const data = {
    user: params.user,
    name: params.name,
    description: params.description,
    categories: params.categories
  }
  return this.create(data)
}

export default mongoose.model('Brands', Brands);
