import { Router } from 'express';

import { MemeModel } from '../db.js';
import IMeme from '../types/IMeme.js';

const router = Router();

router.get('/:img', async (request, response) => {
  const [id, format] = ((request.params.img ?? '') as string).split('.');

  if (!id) {
    console.log('🟠 The requested image was not found.');
    response.sendStatus(404);
    return;
  }

  try {
    const meme: IMeme | null = await MemeModel.findById(id);

    if (!meme?.img) {
      console.log('🟠 The requested image was not found.');
      response.sendStatus(404);
      return;
    }

    response.setHeader(
      'Content-Type',
      meme.format ?? 'image/' + format ?? 'image/jpeg',
    );

    const imageBuffer = Buffer.from(meme.img, 'binary');

    response.send(imageBuffer);
  } catch (error) {
    console.log('There is an error!' + '\n' + error);
    response.sendStatus(500);
  }
});

export const imageRouter = router;
