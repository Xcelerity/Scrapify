import { Schema, model } from 'mongoose';

const scrapedDataSchema = new Schema({
  name: String,
  data: String,
});

export default model('ScrapedData', scrapedDataSchema);