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
 * @returns {*}
 */
Brands.methods.getId = function () {
  return `${this._id}`;
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
 * @param id
 * @returns {Promise<*>}
 */
Brands.statics.getBrandDtoById = async function (id) {
  return await this.getBrandDto({_id: new mongoose.Types.ObjectId(id)})
}

/**
 *
 * @param params
 * @returns {*|null}
 */
Brands.statics.getBrandDto = async function (params = {}) {
  const brand = await this.findOne(params).populate([{path: 'categories', populate: 'options'}]);
  return brand ? this.getDto(brand) : null;
}

/**
 *
 * @param params
 * @returns {*|null}
 */
Brands.statics.getBrandsDto = async function (params = {}) {
  const brands = await this.find(params).populate([{path: 'categories', populate: 'options'}]);
  return brands?.map(i => this.getDto(i));
}

/**
 *
 * @param brand
 * @returns {{name: any, description: *, id: *, categories, user}}
 */
Brands.statics.getDto = function (brand) {
  return {
    id: brand.getId(),
    user: brand.getUser(),
    name: brand.getName(),
    description: brand.getDescription(),
    categories: brand.getCategories().map(i => Categories.getDto(i))
  }
}

export default mongoose.model('Brands', Brands);
