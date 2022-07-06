import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuBarDataResolver } from './resolver/menu-bar-data.resolver';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'orchestration',
    loadChildren: () =>
      import('./orchestration-layout/orchestration-layout.module').then(
        (m) => m.OrchestrationLayoutModule
      ),
      resolve:{ menuData: MenuBarDataResolver },
    canActivate: [AuthGuard],
  },
  {
    path: 'error/:errorCode',
    component: ErrorPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: ErrorPageComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
