import { Router } from 'express';

import { HashtagModel } from '../db.js';
import IHashtag from '../types/IHashtag.js';
import { Schema } from 'mongoose';
import dotenv from 'dotenv';
import OpenAI from 'openai';

const router = Router();
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.get('/', async (request, response) => {
  const from = +(request.query?.from ?? 0);
  const to = +(request.query?.to ?? 1000);
  const query: string = request.headers.query?.length
    ? JSON.parse(request.headers.query as string)
    : '';

  let allHashtags: IHashtag<Schema.Types.ObjectId | string>[];
  let memesIds: string[] = [];

  try {
    allHashtags = [...(await HashtagModel.find())] ?? [];

    let requiredHashtags: string[] = [];

    if (query?.length) {
      const prompt = `The user wrote a request about the meme he wants to find. Convert his request into a list of one-word hashtags (without "#") on english separated by single space (" "). No need to write any explanations, just write a list of hashtags.
User Request: "${query}".
All hashtags must be a singular noun.`;

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      });
      console.log(completion.choices[0].message.content);
      requiredHashtags =
        completion.choices[0].message.content?.split(/,\s*|\s+/) ?? [];

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

export const memesByQueryRouter = router;
