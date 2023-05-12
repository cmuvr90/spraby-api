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

const Collections = new Model(FIELDS, {
  timestamps: true,
  toObject: {virtuals: true},
  toJSON: {virtuals: true}
});


Collections.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

/**
 *
 */
Collections.virtual('id').get(function () {
  return `${this._id}`;
});

/**
 *
 * @returns {*}
 */
Collections.methods.getId = function () {
  return this._id;
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
 * @returns {Promise<*|null>}
 */
Collections.statics.getCollectionJsonById = async function (id) {
  return await this.findOne({_id: new mongoose.Types.ObjectId(id)}).populate([
    {
      path: 'categories',
      populate: 'options'
    }
  ]);
}

/**
 *
 * @param handle
 * @returns {Promise<*>}
 */
Collections.statics.getCollectionJsonByHandle = async function (handle) {
  return await this.findOne({handle}).populate([
    {
      path: 'categories',
      populate: 'options'
    }
  ]);
}

/**
 *
 * @returns {Promise<*>}
 */
Collections.statics.getCollectionsJsonById = async function () {
  return await this.find().populate([
    {
      path: 'categories',
      populate: 'options'
    }
  ]);
}

export default mongoose.model('Collections', Collections);
