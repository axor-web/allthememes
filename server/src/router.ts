const express = require('express');
const { db, MemeModel, HashtagModel } = require('./db.js');

// mongoose don't works with ESM imports
const { ObjectId } = require('mongoose');

interface IMeme {
  url: string,
  hashtags: string[],
  _id: typeof ObjectId
}

async function attachMemeToHashtags(memeDocument: IMeme, hashtags: string[]) {
  await Promise.all(hashtags.map(async (hashtag: string) => {
    const hashtagDocument = HashtagModel.find({ name: hashtag });

    if (hashtagDocument) { 
      hashtagDocument.memeIds.push(memeDocument._id);
      await hashtagDocument.save();
    }
    else {
      await new HashtagModel({
        name: hashtag,
        memeIds: [memeDocument._id]
      }).save();
    }
  }));
}

const port = 3001;

const app = express();

app.listen(port, (error?: Error): void => {
  error ? console.error(error) : console.log(`listening port ${port}`);
});

app.use(express.json());

app.get('/memes', async (request, response) => {
  const from = request.body?.from ?? 0;
  const to = request.body?.to ?? 20;
  
  let memes: IMeme[];

  try {
    memes = [...await MemeModel.find()].slice(from, to);
  }
  catch (error) {
    response.sendStatus(500);
    return;
  }
  
  if (!memes.length) { response.sendStatus(404); return; }

  response.status(200).send(memes);
});

app.get('/meme', async (request, response) => {
  const id: string | undefined = request.query.id;
  
  if (!id) { response.sendStatus(404); return; }

  try {
    const meme: IMeme = await MemeModel.findById(id);

    if (!meme) { response.sendStatus(404); return; }

    response.status(200).send(meme);
  }
  catch (error) {
    console.log('There is an error!' + '\n' + error);
    response.sendStatus(500);
  }
});
app.post('/meme', async (request, response) => {
  const { url, hashtags } = request.body;
  if (!url || hashtags.length < 2) { response.sendStatus(400); return; }

  try {
    const meme = new MemeModel({url, hashtags});

    const memeDocument: IMeme = await meme.save();
    await attachMemeToHashtags(memeDocument, hashtags);

    response.sendStatus(200);
  }
  catch (error) {
    console.log('There is an error!' + '\n' + error);
    response.sendStatus(500);
  }
});

app.use((request, response) => {
  response.sendStatus(404);
});