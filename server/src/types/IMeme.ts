import { ObjectId } from 'mongoose';

export default interface IMeme {
  img?: string;
  hashtags?: string[];
  format?: string;
  _id: ObjectId;
}
