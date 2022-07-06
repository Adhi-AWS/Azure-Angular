import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { TimeoutError } from 'rxjs';
import { AlertMessageOptions } from 'src/app/models/alert.model';
import { AlertService } from './alert.service';

/**
 * @description Injectable Error Management Service
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorManagementService {
  /**
   * @description Creates an instance of error management service.
   * @param alertService - an instance of AlertService
   */
  constructor(private alertService: AlertService) {}

  /**
   * @description handleApiError() is a public class method,
   * used to handle various API errors.
   * @param alertTitle is a text to be shown as a title on Alert Box.
   * @param errorResponse is the error response from the API.
   * @param [options] - optional error callback options
   */
  handleApiError(
    alertTitle: string,
    errorResponse: HttpErrorResponse | TimeoutError | Error,
    options?: AlertMessageOptions
  ): void {
    if (errorResponse instanceof TimeoutError) {
      this.handleTimeoutError(alertTitle, options);
    } else if (errorResponse instanceof HttpErrorResponse) {
      if (errorResponse.error instanceof ErrorEvent) {
        this.handleUnknownError(alertTitle, options);
      } else {
        this.handleKnownError(alertTitle, errorResponse, options);
      }
    } else {
      this.handleUnknownError(alertTitle, options);
    }
  }

  /**
   * @description handleTimeoutError() is a private class method,
   * used to handle the Connection Time-out error.
   * @param alertTitle is a text to be shown as a title on Alert Box.
   * @param [options] - optional error callback options
   */
  private handleTimeoutError(
    alertTitle: string,
    options?: AlertMessageOptions
  ): void {
    const message = 'Connection timed-out. Please try again later.';
    this.alertService.showMessage(alertTitle, message, false, options);
  }

  /**
   * @description handleUnknownError() is a private class method,
   * used to handle an unknown error.
   * @param alertTitle is a text to be shown as a title on Alert Box.
   * @param [options] - optional error callback options
   */
  handleUnknownError(alertTitle: string, options?: AlertMessageOptions): void {
    const message = 'Something went wrong. Please try again later.';
    this.alertService.showMessage(alertTitle, message, false, options);
  }

  /**
   * @description Validates if errors data is of type array or string
   * @param errors - error data from error response
   * @returns an array of string containing error message(s)
   */
  private validateIfArrayOrNot(errors: string[] | string): string[] {
    return Array.isArray(errors) ? [...errors] : [errors];
  }

  /**
   * @description handle400Error() is a private class method used to handle 400 error.
   * @param alertTitle is a text to be shown as a title on Alert Box.
   * @param errorResponse is the error response from the API.
   * @param [options] - optional error callback options
   */
  private handle400Error(
    alertTitle: string,
    errorResponse: HttpErrorResponse,
    options?: AlertMessageOptions
  ): void {
    let message: string | string[] = '';

    if (errorResponse.error.error !== undefined) {
      message = this.validateIfArrayOrNot(errorResponse.error.error);
      this.alertService.showMessage(alertTitle, message, false, options);
    } else if (errorResponse.error.error_message !== undefined) {
      message = this.validateIfArrayOrNot(errorResponse.error.error_message);
      this.alertService.showMessage(alertTitle, message, false, options);
    } else if (errorResponse.error.errors !== undefined) {
      message = this.validateIfArrayOrNot(errorResponse.error.errors);
      this.alertService.showMessage(alertTitle, message, false, options);
    } else if (errorResponse.error.failed !== undefined) {
      message = this.validateIfArrayOrNot(errorResponse.error.failed);
      this.alertService.showMessage(alertTitle, message, false, options);
    } else if (errorResponse.error.failure !== undefined) {
      message = this.validateIfArrayOrNot(errorResponse.error.failure);
      this.alertService.showMessage(alertTitle, message, false, options);
    } else {
      this.handleUnknownError(alertTitle, options);
    }
  }

  /**
   * @description handleKnownError() is a private class method,
   * used to handle some of the known errors like 400, 401, 404, 500, 502, and soon.
   * @param alertTitle is a text to be shown as a title on Alert Box.
   * @param errorResponse is the error response from the API.
   * @param [options] - optional error callback options
   */
  private handleKnownError(
    alertTitle: string,
    errorResponse: HttpErrorResponse,
    options?: AlertMessageOptions
  ): void {
    switch (errorResponse.status) {
      // Bad Request
      case 400:
        this.handle400Error(alertTitle, errorResponse, options);
        break;
      // Unauthorized
      case 401:
        this.alertService.showMessage(
          alertTitle,
          'You are not authorized to access this.',
          false,
          options
        );
        break;
      // Forbidden
      case 403:
        this.alertService.showMessage(
          alertTitle,
          'You are not authorized to access this.',
          false,
          options
        );
        break;
      // Not Found
      case 404:
        this.handleUnknownError(alertTitle, options);
        break;
      // Method Not Allowed
      case 405:
        this.handleUnknownError(alertTitle, options);
        break;
      // Request Timeout
      case 408:
        this.handleTimeoutError(alertTitle, options);
        break;
      // Internal Server Error
      case 500:
        this.alertService.showMessage(
          alertTitle,
          'Server error. Please try again later',
          false,
          options
        );
        break;
      // Bad Gateway
      case 502:
        this.alertService.showMessage(
          alertTitle,
          'Bad Gateway. Please try again later.',
          false,
          options
        );
        break;
      // Service Unavailable
      case 503:
        this.alertService.showMessage(
          alertTitle,
          'Service not available. Please try again later.',
          false,
          options
        );
        break;
      // Gateway Timeout
      case 504:
        this.alertService.showMessage(
          alertTitle,
          'Gateway time out. Please try again later.',
          false,
          options
        );
        break;
      default:
        this.handleUnknownError(alertTitle, options);
    }
  }
}
