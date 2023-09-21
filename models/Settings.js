import mongoose from "mongoose";
import Model from './index';

const FIELDS = {
  information: {type: String, default: ''},
};

const Settings = new Model(FIELDS, {
  timestamps: true,
  toObject: {virtuals: true},
  toJSON: {virtuals: true}
});

Settings.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.id;
    delete ret.updatedAt;
    delete ret.createdAt;
    delete ret.__v;
    return ret;
  }
});

Settings.statics.getSettings = async function () {
  return await this.findOne({});
}

Settings.statics.getInformation = async function () {
  const data = await this.findOne({}, {information: 1});
  return data?.information ?? '';
}

Settings.statics.setInformation = async function (information) {
  const data = await this.updateOne({}, {$set: {information}});
  return data?.acknowledged && !!data.modifiedCount;
}

export default mongoose.model('Settings', Settings);
