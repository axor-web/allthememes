import { Router } from 'express';

import { HashtagModel } from '../db.js';
import IHashtag from '../types/IHashtag.js';
import { Schema } from 'mongoose';

const router = Router();

router.get('/', async (request, response) => {
  const from = +(request.query?.from ?? 0);
  const to = +(request.query?.to ?? 1000);
  const requiredHashtags: string[] = request.headers.hashtags?.length
    ? JSON.parse(request.headers.hashtags as string)
    : [];

  let allHashtags: IHashtag<Schema.Types.ObjectId | string>[];
  let memesIds: string[] = [];

  try {
    allHashtags = [...(await HashtagModel.find())] ?? [];

    if (requiredHashtags?.length) {
      allHashtags = allHashtags.filter((hashtag) => {
        return requiredHashtags.includes(hashtag.name);
      });
    }

    allHashtags.forEach(
      (hashtag) =>
        (hashtag.memesIds = hashtag.memesIds.map((memeId) =>
          memeId.toString(),
        )),
    );

    const memesIdsFromHashtags = [
      ...new Set(allHashtags.map((hashtag) => hashtag.memesIds).flat(2)),
    ];

    if (requiredHashtags?.length) {
      for (const memeId of memesIdsFromHashtags) {
        if (allHashtags.every((hashtag) => hashtag.memesIds.includes(memeId))) {
          memesIds.push(memeId.toString());
        }
      }
    } else {
      memesIds = memesIdsFromHashtags.map((memeId) => memeId.toString());
    }
  } catch (error) {
    console.log('❌ Error during finding memesIds: ' + error);
    response.sendStatus(500);
    return;
  }

  if (!memesIds?.length) {
    console.log('🟠 The requested memeIds was not found.');
    response.sendStatus(404);
    return;
  }

  memesIds = memesIds.slice(from, to);

  response.status(200).json(memesIds);
});

export const memesRouter = router;
