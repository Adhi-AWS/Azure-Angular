import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginOtpComponent } from './login-otp/login-otp.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { SSOComponent } from './sso/sso.component';

const routes: Routes = [
  { path: '', redirectTo: 'sso', pathMatch: 'full' },
  { path: 'login', component: AdminLoginComponent, canActivate: [AuthGuard] },
  { path: 'sso', component: SSOComponent },
  { path: 'login/otp', component: LoginOtpComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
