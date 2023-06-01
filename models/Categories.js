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
 * @param queryParams
 * @returns {Promise<*|{paginator: {next: boolean, pages: (number|number), prev: boolean, count: *, page: number}, items: *}>}
 */
Categories.statics.getCategoriesJson = async function (queryParams = {}) {
  let params = {};

  if (queryParams?.ids?.length) {
    params._id = {$in: queryParams.ids.map(i => new mongoose.Types.ObjectId(i))}
  }

  if (queryParams?.query?.length) {
    params.$or = ['name', 'title', 'description'].map(i => ({
      [i]: {
        $regex: `${queryParams?.query}`.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        $options: 'i'
      }
    }));
  }

  const query = this.find(params).populate('options');

  if (queryParams.hasOwnProperty('page')) {
    const limit = +(queryParams['limit'] ?? 10);
    const count = await this.countDocuments(params);
    const page = +queryParams.page;
    const pages = limit > 0 ? Math.ceil(count / +limit) : 0;

    query.skip(limit * (page - 1)).limit(limit);

    return {
      items: await query,
      paginator: {
        count,
        pages,
        page,
        next: page < pages,
        prev: page > 1
      }
    }
  } else {
    return await query;
  }
}

export default mongoose.model('Categories', Categories);
