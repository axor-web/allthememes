const { Schema, model, connect } = require('mongoose');

const server = 'localhost:27017';
const database = 'memes';

class Database {
  constructor() {
    this.#connect();
  }

  #connect() {
      connect(`mongodb://${server}/${database}`, 
        {  
          useNewUrlParser: true,  
          useUnifiedTopology: true,
        })
      .then(() => {
        console.log('Database connection successful');
      })
      .catch((error: Error) => {
        console.error(`Database connection error: ${error}`);
      });
  }
}

const memeSchema = new Schema({
  url: { type: String, required: true },
  hashtags: { type: Array, required: true }
}, { collection: 'uploadedmemes' });

const hashtagSchema = new Schema({
  name: { type: String, required: true },
  memesIds: { type: Array, required: true }
}, { collection: 'hashtags' })

module.exports = {
  db: new Database(),
  MemeModel: model('Meme', memeSchema),
  HashtagModel: model('Hashtag', hashtagSchema)
};