import mongoose from "mongoose";
import Model from './index';
import Options from './Options';

const FIELDS = {
  name: {type: String, required: true},
  handle: {type: String, required: true},
  title: {type: String, default: null},
  description: {type: String, default: null},
  image: {type: String, default: null},
  options: [{
    type: mongoose.Schema.Types.ObjectId, ref: Options
  }]
};

const Categories = new Model(FIELDS, {
  timestamps: true,
  toObject: {virtuals: true},
  toJSON: {virtuals: true}
});


Categories.set('toJSON', {
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
Categories.virtual('id').get(function () {
  return `${this._id}`;
});

/**
 *
 * @returns {*}
 */
Categories.methods.getId = function () {
  return this._id;
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
 * @returns {Promise<*|null>}
 */
Categories.statics.getCategoryJsonById = async function (id) {
  return await this.findOne({_id: new mongoose.Types.ObjectId(id)}).populate([
    {
      path: 'options',
    }
  ]);
}

/**
 *
 * @param params
 * @returns {Promise<*>}
 */
Categories.statics.getCategoriesJson = async function (params = {}) {

  const queryParams = params?.ids?.length ? {
    _id: {$in: params.ids.map(i => new mongoose.Types.ObjectId(i))}
  } : {};

  return await this.find(queryParams).populate([
    {
      path: 'options',
    }
  ]);
}

export default mongoose.model('Categories', Categories);
