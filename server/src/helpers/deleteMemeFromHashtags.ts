import { HashtagModel } from '../db.js';
import { Document, Types } from 'mongoose';

export default async function deleteMemeFromHashtags(
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
      }
    }),
  );
}
