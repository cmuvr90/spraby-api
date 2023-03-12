import mongoose from "mongoose";
import Model from './index';
import Categories from './Categories';

const FIELDS = {
  name: {type: String, required: true},
  handle: {type: String, required: true},
  title: {type: String, default: null},
  description: {type: String, default: null},
  image: {type: String, default: null},
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId, ref: Categories
    }
  ]
};

const Collections = new Model(FIELDS);

/**
 *
 * @returns {*}
 */
Collections.methods.getId = function () {
  return `${this._id}`;
}

/**
 *
 * @returns {*}
 */
Collections.methods.getHandle = function () {
  return this.handle;
}

/**
 *
 * @returns {*}
 */
Collections.methods.getName = function () {
  return this.name;
}

/**
 *
 * @returns {*}
 */
Collections.methods.getTitle = function () {
  return this.title;
}

/**
 *
 * @returns {*}
 */
Collections.methods.getDescription = function () {
  return this.description;
}

/**
 *
 * @returns {*}
 */
Collections.methods.getImage = function () {
  return this.image;
}

/**
 *
 * @returns {*}
 */
Collections.methods.getCategories = function () {
  return this.categories;
}


/**
 *
 * @param id
 * @returns {Promise<*>}
 */
Collections.statics.getCollectionDtoById = async function (id) {
  return await this.getCollectionDto({_id: new mongoose.Types.ObjectId(id)})
}

/**
 *
 * @param handle
 * @returns {Promise<*>}
 */
Collections.statics.getCollectionDtoByHandle = async function (handle) {
  return await this.getCollectionDto({handle})
}

/**
 *
 * @param params
 * @returns {*|null}
 */
Collections.statics.getCollectionDto = async function (params = {}) {
  const collection = await this.findOne(params).populate([{path: 'categories', populate: 'options'}]);
  return collection ? this.getDto(collection) : null;
}

/**
 *
 * @param params
 * @returns {*|null}
 */
Collections.statics.getCollectionsDto = async function (params = {}) {
  const collections = await this.find(params).populate([{path: 'categories', populate: 'options'}]);
  return collections?.map(i => this.getDto(i));
}

/**
 *
 * @param collection
 * @returns {{name: *, options: *, description: *, handle: *, id: *, title: *}}
 */
Collections.statics.getDto = function (collection) {
  return {
    id: collection.getId(),
    handle: collection.getHandle(),
    name: collection.getName(),
    title: collection.getTitle(),
    description: collection.getDescription(),
    categories: collection.getCategories().map(i => Categories.getDto(i)),
  }
}

export default mongoose.model('Collections', Collections);
