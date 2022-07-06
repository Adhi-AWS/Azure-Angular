export class AlertState {
  show?: boolean;
  showOverlay?: boolean;
  isMessage?: boolean;
  isConfirm?: boolean;
  isProgress?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
  titleMessage?: string;
  message?: string | string[];
  messageButtonText?: string | boolean;
  progressValue?: number;
  indeterminate?: boolean;
  duration?: number;
  confirmYesText?: string | boolean;
  confirmNoText?: string | boolean;
  confirmCallback?: Function | null | undefined;
  isMarkdownText?: boolean;
}

export class AlertMessageOptions {
  yesText?: string | boolean;
  noText?: string | boolean;
  messageButtonText?: string | boolean;
  callback?: (state: boolean) => boolean;
}
