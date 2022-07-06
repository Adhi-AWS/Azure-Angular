import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrettyJsonModule } from 'angular2-prettyjson';
import { BnNgIdleService } from 'bn-ng-idle';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { AlertComponent } from './shared/alert/alert.component';
import { ClickStopPropagation } from './shared/directives/click-stop-propagation.directive';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { LoaderInterceptor } from './shared/interceptors/loader.interceptor';
import { LoaderComponent } from './shared/loader/loader.component';
import { ConfirmationComponent } from './shared/confirmation/confirmation.component';


@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    LoaderComponent,
    LoaderComponent,
    AlertComponent,
    ClickStopPropagation,
    ConfirmationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    PrettyJsonModule,
  ],
  providers: [
    BnNgIdleService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
