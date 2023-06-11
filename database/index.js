import mongoose from 'mongoose';

export const connectToMongo = async url => {
  try {
    console.log('~ Connecting to DB ...');
    await mongoose.connect(url);
    console.log(`✔ Connected to DB`);
    return true;
  } catch (e) {
    console.error(`✖ Error connect to DB → ${e?.message || e}`);
    return false;
  }
}
