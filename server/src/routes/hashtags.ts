import { Router } from 'express';
import { HashtagModel } from "../db";
import IHashtag from "../../../common/types/IHashtag";

const router = Router();

router.get('/', async (_, response) => {
  let hashtags: IHashtag[];

  try {
    hashtags = [...await HashtagModel.find()];
  }
  catch (error) {
    response.sendStatus(500);
    return;
  }
  
  if (!hashtags.length) { response.sendStatus(404); return; }
  
  response.status(200).json(hashtags);
});

export const hashtagsRouter = router;