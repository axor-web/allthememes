export default interface IMeme {
  _id?: string;
  img?: string;
  format?: string;
  hashtags?: (string | never)[];
}
