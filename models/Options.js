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

const Options = new Model(FIELDS);

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
 * @param id
 * @returns {Promise<*>}
 */
Options.statics.getOptionDtoById = async function (id) {
  return await this.getOptionDto({_id: mongoose.Types.ObjectId(id)})
}

/**
 *
 * @param params
 * @returns {*|null}
 */
Options.statics.getOptionDto = async function (params = {}) {
  const option = await this.findOne(params);
  return option ? this.getDto(option) : null;
}

/**
 *
 * @param params
 * @returns {*|null}
 */
Options.statics.getOptionsDto = async function (params = {}) {
  const options = await this.find(params);
  return options?.map(i => this.getDto(i));
}

/**
 *
 * @param option
 * @returns {{values, name: *, description: *, id: *, type: *, title: *, key: *}}
 */
Options.statics.getDto = function (option) {
  return {
    id: option.getId(),
    name: option.getName(),
    type: option.getType(),
    key: option.getKey(),
    title: option.getTitle(),
    description: option.getDescription(),
    values: option.getValues(),
  }
}

Options.statics.TYPES = TYPES;

export default mongoose.model('Options', Options);
