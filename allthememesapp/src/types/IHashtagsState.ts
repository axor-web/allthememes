export default interface HashtagsState {
  hashtags: string[],
  isSearch: boolean,
  isFirstSearch: boolean,
  isWarning?: boolean,
  warningMessage?: string,
  prompt?: string,
  mode: boolean
}