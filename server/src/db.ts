import { connect, model, Schema } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongo:27017/${process.env.MONGO_INITDB_DATABASE}`;

class Database {
  constructor() {
    this.#connect();
  }

  #connect() {
    connect(uri)
      .then(() => {
        console.log('🟢 Database connection successful');
      })
      .catch((error: Error) => {
        console.error(`❌ Database connection error: ${error}`);
      });
  }
}

const memeSchema = new Schema(
  {
    img: { type: String, required: true },
    format: { type: String },
    hashtags: { type: Array, required: true },
  },
  { collection: 'uploadedmemes' },
);

const hashtagSchema = new Schema(
  {
    name: { type: String, required: true },
    memesIds: { type: Array, required: true },
  },
  { collection: 'hashtags' },
);

export const db = new Database();
export const MemeModel = model('Meme', memeSchema);
export const HashtagModel = model('Hashtag', hashtagSchema);
