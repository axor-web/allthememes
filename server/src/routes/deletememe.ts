import { Router } from 'express';
import { MemeModel } from '../db.js';
import deleteMemeFromHashtags from '../helpers/deleteMemeFromHashtags.js';

const router = Router();

router.post('/:id', async (request, response) => {
  const id: string = request.params.id ?? (request.query.id as string) ?? '';

  if (!id) {
    response.sendStatus(400);
    return;
  }

  try {
    const meme = await MemeModel.findById(id);

    if (!meme) {
      response.sendStatus(400);
      return;
    }

    await MemeModel.findByIdAndRemove(id);

    await deleteMemeFromHashtags(meme, meme.hashtags);
    response.sendStatus(200);
  } catch (error) {
    console.log('There is an error!' + '\n' + error);
    response.sendStatus(500);
  }
});

export const deleteMemeRouter = router;
