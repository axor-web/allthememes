export default interface IStatusState {
  status: string;
  isLoading?: boolean;
  isUploading?: boolean;
  isRetry?: boolean;
  isDelete?: boolean;
  isEdit?: boolean;
  isRetryButtonVisible?: boolean;
  isGoToMainPageLinkVisible?: boolean;
  isUploadButtonVisible?: boolean;
}
