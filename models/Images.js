import Model from './index';
import mongoose from 'mongoose';

const FIELDS = {
  alt: {type: String, required: null},
  src: {type: String, required: 'Src is required'},
  description: {type: String, default: null},
  position: {type: Number, default: 1}
};

const Images = new Model(FIELDS);

/**
 *
 * @returns {*}
 */
Images.methods.getId = function () {
  return `${this._id}`;
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
Images.methods.getPosition = function () {
  return this.position;
}

/**
 *
 * @param image
 * @returns {{src: *, alt: *, id: *}}
 */
Images.statics.getDto = function (image) {
  return {
    id: image.getId(),
    src: process.env.HOST + ':' + process.env.PORT + '/' + image.getSrc(),
    alt: image.getAlt(),
    position: image.getPosition(),
  }
}

export default mongoose.model('Images', Images);
