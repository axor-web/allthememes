import { ObjectId } from 'mongoose';

export default interface IHashtag<T = ObjectId> {
  name: string;
  memesIds: T[];
}
