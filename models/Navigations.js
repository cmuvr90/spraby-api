import mongoose from "mongoose";
import Model from './index';

const FIELDS = {
  type: {type: String, default: 'main'},
  body: {type: Array, default: []},
  description: {type: String, default: null},
};

const Navigations = new Model(FIELDS, {
  timestamps: true,
  toObject: {virtuals: true},
  toJSON: {virtuals: true}
});

Navigations.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
  }
});

/**
 *
 * @param type
 * @returns {Promise<*>}
 */
Navigations.statics.getNavigationJsonByType = async function (type = 'main') {
  return await this.findOne({type});
}

/**
 *
 * @param id
 * @returns {Promise<*>}
 */
Navigations.statics.getNavigationJsonById = async function (id) {
  return await this.findOne({_id: new mongoose.Types.ObjectId(id)});
}

/**
 *
 * @param params
 * @returns {Promise<data>}
 */
Navigations.statics.createNavigation = async function (params) {
  const data = {
    type: params.type,
    body: params.body,
    description: params?.description ?? '',
  }
  return this.create(data)
}

export default mongoose.model('Navigations', Navigations);
