import { Router } from 'express';
import { HashtagModel, MemeModel } from '../db.js';
import { Document, Types } from 'mongoose';

async function deleteMemeFromHashtags(
  memeDocument: Document<
    unknown,
    NonNullable<unknown>,
    { hashtags: string[]; img: string }
  > & { _id: Types.ObjectId },
  hashtags: string[],
) {
  await Promise.all(
    hashtags.map(async (hashtag: string) => {
      const hashtagDocument = await HashtagModel.findOne({ name: hashtag });

      if (hashtagDocument) {
        hashtagDocument.memesIds.splice(
          hashtagDocument.memesIds.indexOf(memeDocument._id),
          1,
        );
        await hashtagDocument.save();
      } else {
        await new HashtagModel({
          name: hashtag,
          memesIds: [memeDocument._id],
        }).save();
      }
    }),
  );
}

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

    await deleteMemeFromHashtags(dbResponse, dbResponse.hashtags);
    response.sendStatus(200);
  } catch (error) {
    console.log('There is an error!' + '\n' + error);
    response.sendStatus(500);
  }
});

export const deleteMemeRouter = router;
