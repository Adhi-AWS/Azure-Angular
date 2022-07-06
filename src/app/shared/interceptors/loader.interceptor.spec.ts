import { getTestBed, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './loader.interceptor';
import { LoaderService } from './loader.service';
import { LocationService } from '@app/core/services/location.service';
import { WINDOW_PROVIDERS } from '@app/core/services/window-reference-provider.service';

describe('LoaderInterceptor Test Suite', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        WINDOW_PROVIDERS,
        LoaderService,
        LocationService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoaderInterceptor,
          multi: true
        }]
    });
  });

  function setup() {
    const injector: TestBed = getTestBed();
    const httpMock: HttpTestingController = injector.inject(HttpTestingController);
    const loaderService: LoaderService = TestBed.inject(LoaderService);
    const locationService: LocationService = TestBed.inject(LocationService);
    return { httpMock, loaderService, locationService };
  }

  describe('intercept()', () => {
    it('should send the request as it is for Announcements API on Reports page', inject([HttpClient], (http: HttpClient) => {
      const { httpMock, locationService, loaderService } = setup();
      spyOn(locationService, 'getPathname').and.callFake(() => '/reports/heatmap');
      http.get('/api/v1/announcements').subscribe();
      const httpRequest: TestRequest = httpMock.expectOne('/api/v1/announcements');
      expect(httpRequest.request.url).toEqual('/api/v1/announcements');
      let isLoadingValue: boolean;
      loaderService.isLoading.subscribe((data: any) => isLoadingValue = data);
      expect(isLoadingValue).toBeFalsy();
    }));

    it('should send the request for Configuration pages with Success Response', inject([HttpClient], (http: HttpClient) => {
      const { httpMock, locationService, loaderService } = setup();
      spyOn(locationService, 'getPathname').and.callFake(() => '/configuration/slts/list');
      http.get('/api/v1/create-update-slt-v2').subscribe();
      const httpRequest: TestRequest = httpMock.expectOne('/api/v1/create-update-slt-v2');
      expect(httpRequest.request.url).toEqual('/api/v1/create-update-slt-v2');
      let isLoadingValue: boolean;
      loaderService.isLoading.subscribe((data: any) => isLoadingValue = data);
      expect(isLoadingValue).toBeTruthy();
      httpRequest.flush({}, {
        status: 200,
        statusText: 'OK',
        headers: new HttpHeaders().set('content-type', 'application/json')
      });
      expect(isLoadingValue).toBeFalsy();
    }));

    it('should send the request for Configuration pages with Error Response', inject([HttpClient], (http: HttpClient) => {
      const { httpMock, locationService, loaderService } = setup();
      let response: any;
      let errResponse: any;
      spyOn(locationService, 'getPathname').and.callFake(() => '/configuration/slts/list');
      http.get('/api/v1/create-update-slt-v2').subscribe(
        (res: any) => response = res,
        (err: any) => errResponse = err
      );
      const httpRequest: TestRequest = httpMock.expectOne('/api/v1/create-update-slt-v2');
      expect(httpRequest.request.url).toEqual('/api/v1/create-update-slt-v2');
      let isLoadingValue: boolean;
      loaderService.isLoading.subscribe((data: any) => isLoadingValue = data);
      expect(isLoadingValue).toBeTruthy();
      httpRequest.flush('Invalid request parameters', {
        status: 400,
        statusText: 'FAILED'
      });
      expect(isLoadingValue).toBeFalsy();
    }));
  });

  afterEach(() => {
    const { httpMock } = setup();
    httpMock.verify();
    TestBed.resetTestingModule();
  });
});
