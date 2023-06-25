import Schema from './index';
import mongoose from 'mongoose';

const FIELDS = {
  alt: {type: String, required: null},
  src: {type: String, required: 'Src is required'},
  description: {type: String, default: null},
};

const Images = new Schema(FIELDS);

Images.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;

    ret.src = !ret.src.includes('http') ? process.env.HOST + ':' + (process.env.HOST.includes('localhost') ? process.env.PORT : '') + '/' + ret.src : ret.src; //@todo
  }
});

/**
 *
 * @returns {*}
 */
Images.methods.getId = function () {
  return this._id;
}

/**
 *
 * @returns {*}
 */
Images.methods.getSrc = function () {
  return this.src;
}

/**
 *
 * @returns {*}
 */
Images.methods.getAlt = function () {
  return this.alt;
}

/**
 *
 * @returns {*}
 */
Images.methods.getDescription = function () {
  return this.description;
}

export default mongoose.model('Images', Images);
