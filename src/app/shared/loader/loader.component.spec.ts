import { ChangeDetectorRef, Type } from '@angular/core';
import { waitForAsync, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { MaterialModule } from 'src/app/material/material.module';
import { LoaderService } from 'src/app/services/loader.service';
import { LoaderComponent } from './loader.component';

describe('LoaderComponent Test Suite', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderComponent],
      imports: [MaterialModule],
      providers: [
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => {}),
        },
        LoaderService,
      ],
    });
  });

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LoaderComponent],
        imports: [MaterialModule],
        providers: [
          {
            provide: HAMMER_LOADER,
            useValue: () => new Promise(() => {}),
          },
          LoaderService,
        ],
      });
    })
  );

  function setup() {
    const fixture = TestBed.createComponent(LoaderComponent);
    const component: LoaderComponent = fixture.debugElement.componentInstance;
    const loaderService: LoaderService =
      fixture.debugElement.injector.get(LoaderService);
    const changeDetectorRef =
      fixture.debugElement.injector.get<ChangeDetectorRef>(
        ChangeDetectorRef as Type<ChangeDetectorRef>
      );
    return { fixture, component, loaderService, changeDetectorRef };
  }

  describe('ngOnInit()', () => {
    it('should create', () => {
      const { component } = setup();
      expect(component).toBeTruthy();
    });

    it('should show the spinner', fakeAsync(() => {
      const { component, loaderService, changeDetectorRef } = setup();
      component.loading = false;
      loaderService.isLoading.next(true);
      spyOnProperty(loaderService, 'isLoading').and.callThrough();
      const detectChangesSpy = spyOn(
        changeDetectorRef.constructor.prototype,
        'detectChanges'
      );
      component.ngOnInit();
      tick();
      expect(component.loading).toBeTruthy();
      expect(detectChangesSpy).toHaveBeenCalled();
    }));

    it('should hide the spinner', fakeAsync(() => {
      const { component, loaderService, changeDetectorRef } = setup();
      component.loading = false;
      spyOnProperty(loaderService, 'isLoading').and.callThrough();
      const detectChangesSpy = spyOn(
        changeDetectorRef.constructor.prototype,
        'detectChanges'
      );
      component.ngOnInit();
      tick();
      expect(component.loading).toBeFalsy();
      expect(detectChangesSpy).toHaveBeenCalled();
    }));
  });
});
