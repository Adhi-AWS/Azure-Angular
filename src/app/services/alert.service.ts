import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AlertState, AlertMessageOptions } from 'src/app/models/alert.model';

/**
 * @description Injectable Alert Service
 */
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertSubject = new Subject<AlertState>();
  alertState = this.alertSubject.asObservable();

  /**
   * @description Creates an instance of alert service.
   */
  constructor() {}

  /**
   * @description will push state changes to the alert component
   * @param titleMessage - title of the dialog
   * @param message contains message to be displayed
   * @param [isSuccess] - true or false based on whether success or failure
   * @param [options] contains the callback function options
   * @param [duration] contains the duration for which the message should be displayed
   */
  showMessage(
    titleMessage: string,
    message: string | string[],
    isSuccess?: boolean,
    options?: AlertMessageOptions,
    duration?: number
  ): void {
    const state: AlertState = {
      show: true,
      isMessage: true,
      titleMessage,
      showOverlay: true,
      message: Array.isArray(message) ? message : [message],
      isSuccess,
      messageButtonText: options ? options.messageButtonText || false : false,
      confirmCallback: options ? options.callback : null,
    };
    this.alertSubject.next(state);

    // Dismiss message after duration
    if (duration) {
      setTimeout(() => {
        this.hide();
      }, duration);
    }
  }

  /**
   * @description will push state changes to the alert component.
   * @param message contains message to be displayed.
   * @param options contains the options to be displayed on the confirmation object.
   */
  showConfirmation(
    titleMessage: string,
    message: string,
    options?: AlertMessageOptions,
    isMarkdownText: boolean = false
  ): void {
    const state: AlertState = {
      show: true,
      isConfirm: true,
      showOverlay: true,
      titleMessage,
      message,
      isMarkdownText,
      confirmYesText: options ? options.yesText || false : false,
      confirmNoText: options ? options.noText || false : false,
      confirmCallback: options ? options.callback : null,
    };
    this.alertSubject.next(state);
  }

  /**
   * @description will push state changes to the alert component.
   * @param message contains message to be displayed.
   * @param progress_value contains the progress value to be shown.
   * @param indeterminate contains the boolean value to show indeterminate progress bar.
   */
  showProgress(message: string, progress: number, indeterminate = false): void {
    // Sanitize progress value
    progress = progress > 100 ? 100 : progress < 0 ? 100 : progress;
    const state: AlertState = {
      show: true,
      isProgress: true,
      indeterminate,
      showOverlay: true,
      message,
      progressValue: progress,
    };
    this.alertSubject.next(state);
  }

  /**
   * @description will push state changes to the alert component.
   * @param message contains message to be displayed.
   * @param progress_value contains the progress value to be shown.
   * @param indeterminate contains the boolean value to show indeterminate progress bar.
   */
  showLoading(message: string, indeterminate = false, progress: number): void {
    // Sanitize progress value
    progress = progress > 100 ? 100 : progress < 0 ? 100 : progress;
    const state: AlertState = {
      show: true,
      isLoading: true,
      indeterminate,
      showOverlay: true,
      message,
      progressValue: progress,
    };
    this.alertSubject.next(state);
  }

  /**
   * @description will hide the alert.
   */
  hide(): void {
    const state: AlertState = {
      show: false,
      isConfirm: false,
      isMessage: false,
      isProgress: false,
      showOverlay: false,
    };
    document
      .getElementsByTagName('html')[0]
      .setAttribute('style', 'overflow: auto;');
    this.alertSubject.next(state);
  }
}
