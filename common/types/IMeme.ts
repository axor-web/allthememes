import { ObjectId } from 'mongoose';

export default interface IMeme {
  url: string,
  hashtags: string[],
  _id: ObjectId
}