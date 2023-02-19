import mongoose from "mongoose";
import Model from './index';
import Options from './Options';

const FIELDS = {
  name: {type: String, required: true},
  handle: {type: String, required: true},
  title: {type: String, default: null},
  description: {type: String, default: null},
  image: {type: String, default: null},
  options: [
    {
      type: mongoose.Schema.Types.ObjectId, ref: Options
    }
  ]
};

const Categories = new Model(FIELDS);

/**
 *
 * @returns {*}
 */
Categories.methods.getId = function () {
  return `${this._id}`;
}

/**
 *
 * @returns {*}
 */
Categories.methods.getHandle = function () {
  return this.handle;
}

/**
 *
 * @returns {*}
 */
Categories.methods.getName = function () {
  return this.name;
}

/**
 *
 * @returns {*}
 */
Categories.methods.getTitle = function () {
  return this.title;
}

/**
 *
 * @returns {*}
 */
Categories.methods.getDescription = function () {
  return this.description;
}

/**
 *
 * @returns {*}
 */
Categories.methods.getImage = function () {
  return this.image;
}

/**
 *
 * @returns {*}
 */
Categories.methods.getOptions = function () {
  return this.options;
}

/**
 *
 * @param id
 * @returns {Promise<*>}
 */
Categories.statics.getCategoryDtoById = async function (id) {
  return await this.getCategoryDto({_id: mongoose.Types.ObjectId(id)})
}

/**
 *
 * @param handle
 * @returns {Promise<*>}
 */
Categories.statics.getCategoryDtoByHandle = async function (handle) {
  return await this.getCategoryDto({handle})
}

/**
 *
 * @param params
 * @returns {*|null}
 */
Categories.statics.getCategoryDto = async function (params = {}) {
  const category = await this.findOne(params);
  return category ? this.getDto(category) : null;
}

/**
 *
 * @param params
 * @returns {*|null}
 */
Categories.statics.getCategoriesDto = async function (params = {}) {
  const categories = await this.find(params).populate('options');
  return categories?.map(i => this.getDto(i));
}

/**
 *
 * @param category
 * @returns {{name: any, options: *, description: *, handle: *, id: *}}
 */
Categories.statics.getDto = function (category) {
  return {
    id: category.getId(),
    handle: category.getHandle(),
    name: category.getName(),
    title: category.getTitle(),
    description: category.getDescription(),
    options: category.getOptions(),
  }
}

export default mongoose.model('Categories', Categories);
