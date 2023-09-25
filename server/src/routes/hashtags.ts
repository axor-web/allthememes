import { Router } from 'express';
import { HashtagModel } from '../db.js';
import IHashtag from '../types/IHashtag.js';

const router = Router();

router.get('/', async (_, response) => {
  let hashtags: IHashtag[];

  try {
    hashtags = [...(await HashtagModel.find())];
  } catch (error) {
    console.log('❌ Error during finding memes: ' + error);
    response.sendStatus(500);
    return;
  }

  if (!hashtags.length) {
    console.log('🟠 The requested hashtags was not found.');
    response.sendStatus(404);
    return;
  }

  response.status(200).json(hashtags);
});

export const hashtagsRouter = router;
