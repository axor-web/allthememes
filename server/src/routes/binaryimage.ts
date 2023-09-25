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

    response.send({
      image: meme.img,
      format: meme.format ?? 'image/' + format ?? 'image/jpeg',
    });
  } catch (error) {
    console.log('There is an error!' + '\n' + error);
    response.sendStatus(500);
  }
});

export const binaryImageRouter = router;
