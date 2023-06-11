import mongoose from 'mongoose';
import Schema from '../index';
import Images from '../Images';
import Options from '../Options';

const VALUE_FIELDS = {
  option: {type: mongoose.Schema.Types.ObjectId, ref: Options},
  value: {type: String, required: true},
  title: {type: String, required: true},
}

const Values = new Schema(VALUE_FIELDS, {timestamps: false});

const FIELDS = {
  image: {type: mongoose.Schema.Types.ObjectId, ref: Images},
  title: {type: String, default: null},
  values: [Values]
};

const Variants = new Schema(FIELDS, {timestamps: false});

Variants.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
  }
});

Variants.set('toObject', {
  virtuals: true
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
