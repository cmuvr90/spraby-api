import mongoose from 'mongoose';
import Schema from '../index';

const VALUE_FIELDS = {
  optionId: {type: mongoose.Schema.Types.ObjectId, required: true},
  value: {type: String, required: true},
  title: {type: String, required: true},
}

const Values = new Schema(VALUE_FIELDS, {timestamps: false});

const FIELDS = {
  imageId: {type: mongoose.Schema.Types.ObjectId, default: null},
  title: {type: String, default: null},
  values: [Values]
};

const Variants = new Schema(FIELDS, {
  timestamps: false,
  toObject: {virtuals: true},
  toJSON: {virtuals: true}
});

/**
 *
 * @returns {*}
 */
Variants.methods.getId = function () {
  return this._id;
}

/**
 *
 * @returns {*}
 */
Variants.methods.getTitle = function () {
  return this.title;
}

export default Variants;
