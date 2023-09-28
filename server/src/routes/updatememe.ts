import { Router } from 'express';
import { MemeModel } from '../db.js';
import attachMemeToHashtags from '../helpers/attachMemeToHashtags.js';
import deleteMemeFromHashtags from '../helpers/deleteMemeFromHashtags.js';

const router = Router();

router.post('/:id', async (request, response) => {
  const id: string = request.params.id ?? (request.query.id as string) ?? '';

  const meme = request.body;

  if (!id) {
    response.sendStatus(400);
    return;
  }

  try {
    const oldMeme = await MemeModel.findById(id);

    if (!oldMeme) {
      response.sendStatus(400);
      return;
    }

    const deletedHashtags = [];

    for (const hashtag of oldMeme.hashtags) {
      if (!meme.hashtags.includes(hashtag)) {
        deletedHashtags.push(hashtag);
      }
    }

    await MemeModel.findByIdAndUpdate(oldMeme._id, meme);

    await attachMemeToHashtags(oldMeme, meme.hashtags);
    await deleteMemeFromHashtags(oldMeme, deletedHashtags);

    response.sendStatus(200);
  } catch (error) {
    console.log('There is an error!' + '\n' + error);
    response.sendStatus(500);
  }
});

export const updateMemeRouter = router;
