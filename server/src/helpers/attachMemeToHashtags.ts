import { HashtagModel } from '../db.js';
import { Document, Types } from 'mongoose';

export default async function attachMemeToHashtags(
  memeDocument: Document<
    unknown,
    NonNullable<unknown>,
    { hashtags: string[]; img: string }
  > & { _id: Types.ObjectId | string },
  hashtags: string[],
) {
  await Promise.all(
    hashtags.map(async (hashtag: string) => {
      const hashtagDocument = await HashtagModel.findOne({ name: hashtag });

      if (hashtagDocument) {
        if (!hashtagDocument.memesIds.includes(memeDocument._id)) {
          hashtagDocument.memesIds.push(memeDocument._id);
        }
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
