export default interface IStatusState {
  status: string;
  isLoading?: boolean;
  isUploading?: boolean;
  isRetry?: boolean;
  isRetryButtonVisible?: boolean;
  isGoToMainPageLinkVisible?: boolean;
}
