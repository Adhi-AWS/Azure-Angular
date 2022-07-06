import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { LoginOtpComponent } from './login-otp/login-otp.component';
import { GuestHeaderComponent } from './guest-header/guest-header.component';
import { MaterialModule } from '../material/material.module';
import { AlertBoxComponent } from '../shared/alert-box/alert-box.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { SSOComponent } from './sso/sso.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminLoginComponent,
    LoginOtpComponent,
    GuestHeaderComponent,
    AlertBoxComponent,
    SSOComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, MaterialModule],
})
export class AdminModule {}
