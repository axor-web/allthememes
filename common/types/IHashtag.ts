import { ObjectId } from 'mongoose';

export default interface IHashtag {
  name: string,
  memesIds: ObjectId[]
}