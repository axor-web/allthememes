import { Router } from "express";
import IMeme from "../types/IMeme.js";
import { HashtagModel, MemeModel } from "../db.js";
import { Document, Types } from "mongoose";

async function attachMemeToHashtags(memeDocument: Document<unknown, NonNullable<unknown>, { hashtags: string[]; img: string; }> & { _id: Types.ObjectId; }, hashtags: string[]) {
  await Promise.all(hashtags.map(async (hashtag: string) => {
    const hashtagDocument = await HashtagModel.findOne({ name: hashtag });
    
    if (hashtagDocument) { 
      hashtagDocument.memesIds.push(memeDocument._id);
      await hashtagDocument.save();
    }
    else {
      await new HashtagModel({
        name: hashtag,
        memesIds: [ memeDocument._id ]
      }).save();
    }
  }));
}

const router = Router();

router.get('/', async (request, response) => {
  const id: string | undefined = request.query.id as string;

  if (!id) {
    console.log('🟠 The requested meme was not found.');
    response.sendStatus(404);
    return;
  }

  try {
    const meme: IMeme | null = await MemeModel.findById(id);

    if (!meme) {
      console.log('🟠 The requested meme was not found.');
      response.sendStatus(404);
      return;
    }

    meme.img = `localhost:${3001}/image/${meme._id.toString()}.${meme.format ? meme.format.split('/')[1] : ''}`;

    response.status(200).json(meme);
  }
  catch (error) {
    console.log('There is an error!' + '\n' + error);
    response.sendStatus(500);
  }
});

router.post('/', async (request, response) => {
  const { img = '', hashtags = [], format = '' } = request.body;

  if (!img || !format || hashtags.length < 1) {
    response.sendStatus(400);
    return;
  }
  
  try {
    const extension = format.split('/')[1];

    if (!hashtags.includes(extension)) {
      hashtags.push(extension);
    }

    const meme = new MemeModel({img, hashtags, format});

    const memeDocument = await meme.save();
    await attachMemeToHashtags(memeDocument, hashtags);

    response.sendStatus(200);
  }
  catch (error) {
    console.log('There is an error!' + '\n' + error);
    response.sendStatus(500);
  }
});


export const memeRouter = router;