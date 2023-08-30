import { Router } from 'express';

import { MemeModel } from '../db';

const router = Router();

router.get('/memes', async (request, response) => {
  const from = +(request.query?.from ?? 0);
  const to = +(request.query?.to ?? 20);
  
  let memes;

  try {
    memes = [...await MemeModel.find()].slice(from, to);
  }
  catch (error) {
    response.sendStatus(500);
    return;
  }
  
  if (!memes?.length) { response.sendStatus(404); return; }

  response.status(200).json(memes);
});

export const memesRouter = router;