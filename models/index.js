import mongoose from 'mongoose';
import moment from 'moment';

export default class Model {

  /**
   *
   * @param fields
   * @returns {module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, *[]>}
   */
  constructor(fields = []) {
    this.model = new mongoose.Schema(fields, {timestamps: true});

    this.model.statics.FIELDS = fields;
    this.model.statics.updateOrCreate = this.updateOrCreate;
    this.model.statics.prepareItem = this.prepareItem;

    return this.model;
  }

  /**
   *
   * @param query
   * @param params
   * @returns {Promise<*>}
   */
  updateOrCreate = async function (query = {}, params = {}) {
    const update = {};
    const options = {upsert: true, new: true, setDefaultsOnInsert: true};

    for (const key in params) {
      if (params.hasOwnProperty(key) && typeof this.FIELDS[key] !== 'undefined') update[key] = params[key];
    }

    return await this.findOneAndUpdate(query, update, options).exec();
  };

  /**
   *
   * @param item
   * @returns {{createdAt: string, id: string, updatedAt: string}}
   */
  prepareItem = function (item) {
    const data = Object.keys(this.FIELDS).reduce((acc, key) => {
      if (typeof item[key] !== 'undefined') acc[key] = item[key];
      return acc;
    }, {});

    return {
      id: `${item._id}`,
      ...data,
      createdAt: moment(item.createdAt).format('YYYY-MM-DD'),
      updatedAt: moment(item.updatedAt).format('YYYY-MM-DD')
    };
  }
}
