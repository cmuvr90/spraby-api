import mongoose from "mongoose";
import Model from './index';

const TYPES = {
  TEXT: 'text',
  COLOR: 'color'
}

const FIELDS = {
  type: {
    type: String,
    enum: Object.values(TYPES),
    default: TYPES.TEXT,
  },
  name: {type: String, required: true},
  key: {type: String, required: true},
  title: {type: String, required: true},
  description: {type: String, default: null},
  values: [{type: String, required: true}]
};

const Options = new Model(FIELDS, {
  timestamps: true,
  toObject: {virtuals: true},
  toJSON: {virtuals: true}
});

Options.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

/**
 *
 * @returns {*}
 */
Options.methods.getId = function () {
  return `${this._id}`;
}

/**
 *
 * @returns {*}
 */
Options.methods.getName = function () {
  return this.name;
}

/**
 *
 * @returns {*}
 */
Options.methods.getKey = function () {
  return this.key;
}

/**
 *
 * @returns {*}
 */
Options.methods.getType = function () {
  return this.type;
}

/**
 *
 * @returns {*}
 */
Options.methods.getTitle = function () {
  return this.title;
}

/**
 *
 * @returns {*}
 */
Options.methods.getDescription = function () {
  return this.description;
}

/**
 *
 * @returns {*}
 */
Options.methods.getValues = function () {
  return this.values;
}

/**
 *
 * @param queryParams
 * @returns {Promise<*>}
 */
Options.statics.getOptionsJson = async function (queryParams = {}) {
  return await this.paginate({queryParams});
}

/**
 *
 * @param id
 * @returns {Promise<*|null>}
 */
Options.statics.getOptionJsonById = async function (id) {
  return await this.findOne({_id: new mongoose.Types.ObjectId(id)});
}

Options.statics.TYPES = TYPES;

export default mongoose.model('Options', Options);
