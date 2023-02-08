import mongoose from "mongoose";
import Model from './index';

const FIELDS = {
  payloadId: {type: mongoose.Schema.Types.ObjectId, required: true},
  token: {type: String, default: null},
  updatedAt: {
    type: Date,
    default: Date.now,
    index: {expires: '15d'},
  }
};

const Sessions = new Model(FIELDS);

/**
 *
 * @returns {{type: ObjectId, required: boolean}}
 */
Sessions.methods.getPayloadId = function () {
  return this.payloadId;
}

/**
 *
 * @returns {{type: ObjectId, required: boolean}}
 */
Sessions.methods.getToken = function () {
  return this.token;
}

export default mongoose.model('Sessions', Sessions);
