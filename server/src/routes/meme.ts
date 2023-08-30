import { Router } from "express";
import IMeme from "../../../common/types/IMeme";
import { HashtagModel, MemeModel } from "../db";
import { Document, Types } from "mongoose";

async function attachMemeToHashtags(memeDocument: Document<unknown, {}, { hashtags: any[]; url: string; }> & { hashtags: any[]; url: string; } & { _id: Types.ObjectId; }, hashtags: string[]) {
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

router.get('/meme', async (request, response) => {
  const id: string | undefined = request.query.id as string;
  
  if (!id) { response.sendStatus(404); return; }

  try {
    const meme: IMeme | null = await MemeModel.findById(id);

    if (!meme) { response.sendStatus(404); return; }

    response.status(200).json(meme);
  }
  catch (error) {
    console.log('There is an error!' + '\n' + error);
    response.sendStatus(500);
  }
});

router.post('/meme', async (request, response) => {
  const { url, hashtags } = request.body;
  
  if (!url || hashtags.length < 2) { response.sendStatus(400); return; }

  try {
    const meme = new MemeModel({url, hashtags});

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