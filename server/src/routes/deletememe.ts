import { Router } from 'express';
import { MemeModel } from '../db.js';

const router = Router();

router.post('/:id', async (request, response) => {
  const id: string = request.params.id ?? (request.query.id as string) ?? '';

  if (!id) {
    response.sendStatus(400);
    return;
  }

  try {
    const dbResponse = await MemeModel.findByIdAndRemove(id);

    if (!dbResponse) {
      response.sendStatus(400);
      return;
    }

    response.sendStatus(200);
  } catch (error) {
    console.log('There is an error!' + '\n' + error);
    response.sendStatus(500);
  }
});

export const deleteMemeRouter = router;
