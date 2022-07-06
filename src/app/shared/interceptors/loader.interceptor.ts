import { Injectable } from '@angular/core';
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Injectable({
  providedIn: 'root',
})
export class LoaderInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  /**
   * @description Creates an instance of loader interceptor.
   * @param loaderService - an instance of LoaderService
   * @param locationService - an instance of LocationService
   */
  constructor(
    private loaderService: LoaderService,
    private transactionsService: TransactionsService
  ) {}

  /**
   * @description remove request
   * @param req contains HTTPREquest Object
   */
  removeRequest(req: HttpRequest<any>): void {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loaderService.isLoading.next(this.requests.length > 0);
  }

  /**
   * @description intercept http request and handles the event.
   * @param req contains HTTPRequest Object
   * @param next contains HTTPHandler
   * @returns Observable of HTTPEvent
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let showLoader: boolean;
    if (
      (req.urlWithParams.includes('/latest/dashUI/details?task_id=') ||
        req.urlWithParams.includes('/latest/dashUI/states?task_id=')) &&
      this.transactionsService.apiReqCountSubject$.value > 1
    ) {
      showLoader = false;
    } else {
      showLoader = true;
    }

    if (showLoader) {
      this.requests.push(req);
      this.loaderService.isLoading.next(true);

      return new Observable((observer) => {
        const subscription = next.handle(req).subscribe(
          (event) => {
            if (event instanceof HttpResponse) {
              this.removeRequest(req);
              observer.next(event);
            }
          },
          (err) => {
            this.removeRequest(req);
            observer.error(err);
          },
          () => {
            this.removeRequest(req);
            observer.complete();
          }
        );
        // remove request from queue when cancelled
        return () => {
          this.removeRequest(req);
          subscription.unsubscribe();
        };
      });
    } else {
      return next.handle(req);
    }
  }
}
