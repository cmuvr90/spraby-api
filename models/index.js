import mongoose from 'mongoose';
import moment from 'moment';

export default class Schema {

  /**
   *
   * @param fields
   * @param options
   * @returns {module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, {timestamps: boolean}, *[], HydratedDocument<FlatRecord<*[]>, unknown>>}
   */
  constructor(fields = [], options = {timestamps: true}) {
    this.model = new mongoose.Schema(fields, options);

    this.model.statics.FIELDS = fields;
    this.model.statics.updateOrCreate = this.updateOrCreate;
    this.model.statics.findPrepare = this.findPrepare;
    this.model.statics.prepareItem = this.prepareItem;
    this.model.statics.updateById = this.updateById;
    this.model.statics.deleteById = this.deleteById;
    this.model.statics.deleteByIds = this.deleteByIds;
    this.model.statics.findById = this.findById;
    this.model.statics.findByIds = this.findByIds;

    return this.model;
  }

  /**
   *
   * @param id
   * @returns {Promise<*>}
   */
  findById = async function (id) {
    return this.findOne({_id: new mongoose.Types.ObjectId(id)})
  }

  /**
   *
   * @param ids
   * @returns {Promise<*>}
   */
  findByIds = async function (ids) {
    return this.find({_id: {$in: ids.map(id => new mongoose.Types.ObjectId(id))}})
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
   * @returns {Promise<*>}
   */
  findPrepare = async function () {
    return (await this.find()).map(i => this.prepareItem(i));
  }

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
      createdAt: moment(item.createdAt).format(),
      updatedAt: moment(item.updatedAt).format()
    };
  }

  /**
   *
   * @param id
   * @param params
   */
  updateById = async function (id, params) {
    return await this.updateOne({_id: new mongoose.Types.ObjectId(id)}, params);
  }

  /**
   *
   * @param id
   * @returns {Promise<*>}
   */
  deleteById = async function (id) {
    return await this.deleteOne({_id: new mongoose.Types.ObjectId(id)});
  }

  /**
   *
   * @param ids
   * @returns {Promise<*>}
   */
  deleteByIds = async function (ids) {
    return await this.deleteMany({_id: {$in: ids.map(id => new mongoose.Types.ObjectId(id))}});
  }
}
