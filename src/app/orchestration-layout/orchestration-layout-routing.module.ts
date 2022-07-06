import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrchestrationLayoutComponent } from './orchestration-layout.component';
import { AuthGuard } from './../shared/guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProcessorInsightComponent } from './processor-insight/processor-insight.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { ManageApplicationComponent } from './manage-application/manage-application.component';
import { SetupExecutionPlanComponent } from './setup-execution-plan/setup-execution-plan.component';
import { ManageCredentialsComponent } from './manage-credentials/manage-credentials.component';
import { SystemConfigurationComponent } from './system-configuration/system-configuration.component';
import { ConfigAuditComponent } from './config-audit/config-audit.component';
import { ManageAdapterComponent } from './manage-adapter/manage-adapter.component';
import { ManageQueueComponent } from './manage-queue/manage-queue.component';
import { ProductCataloguesComponent } from './product-catalogues/product-catalogues.component';
import { ProductCatalogueDetailsComponent } from './product-catalogue-details/product-catalogue-details.component';
import { UserGuideComponent } from './user-guide/user-guide.component';
import { TaskConfigurationComponent } from './task-configuration/task-configuration.component';
import { ApiConfigurationComponent } from './api-configuration/api-configuration.component';
import { ApprovalInboxComponent } from './approval-inbox/approval-inbox.component';
import { ProductsComponent } from './products/products.component';
import { AccessGuard } from '../shared/guards/access.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ManageSubCategoryComponent } from './manage-sub-category/manage-sub-category.component';
import { CloudCredentialsComponent } from './cloud-credentials/cloud-credentials.component';
import { ManageProductItemComponent } from './manage-product-item/manage-product-item/manage-product-item.component';
import { ManageOauthComponent } from './manage-oauth/manage-oauth.component';
import { ManageReportComponent } from './manage-report/manage-report.component';
import { ReportsComponent } from './reports/reports.component';
import { MonitoringComponent } from './monitoring/monitoring.component';


const routes: Routes = [
  {
    path: '',
    component: OrchestrationLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'processor-insight',
        component: ProcessorInsightComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'transactions/:task_id',
        component: TransactionDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'configuration',
        redirectTo: 'configuration/manage-application',
        pathMatch: 'full',
      },
      {
        path: 'configuration/api-configuration',
        component: ApiConfigurationComponent,
        canActivate: [AuthGuard,AccessGuard],
      },
      {
        path: 'configuration/config-audit',
        component: ConfigAuditComponent,
        canActivate: [AuthGuard,AccessGuard],
      },
      {
        path: 'configuration/manage-adapter',
        component: ManageAdapterComponent,
        canActivate: [AuthGuard,AccessGuard],
      },
      {
        path: 'configuration/manage-application',
        component: ManageApplicationComponent,
        canActivate: [AuthGuard,AccessGuard],
      },
      {
        path: 'configuration/manage-credentials',
        component: ManageCredentialsComponent,
        canActivate: [AuthGuard,AccessGuard],
      },
      {
        path: 'configuration/manage-category',
        component: ManageCategoryComponent,
        canActivate: [AuthGuard,AccessGuard],
      },
      {
        path: 'configuration/manage-product-item',
        component: ManageProductItemComponent,
        canActivate: [AuthGuard,AccessGuard],
      },
      {
        path: 'configuration/manage-sub-category',
        component: ManageSubCategoryComponent,
        canActivate: [AuthGuard,AccessGuard],
      },
      {
        path: 'configuration/manage-queue',
        component: ManageQueueComponent,
        canActivate: [AuthGuard,AccessGuard],
      },
      {
        path: 'configuration/setup-execution-plan',
        component: SetupExecutionPlanComponent,
        canActivate: [AuthGuard,AccessGuard],
      },
      {
        path: 'configuration/system-configuration',
        component: SystemConfigurationComponent,
        canActivate: [AuthGuard,AccessGuard],
      },
      {
        path: 'configuration/task-configuration',
        component: TaskConfigurationComponent,
        canActivate: [AuthGuard,AccessGuard],
      },
      {
        path: 'configuration/cloud-credentials',
        component: CloudCredentialsComponent,
        canActivate: [AuthGuard,AccessGuard],
      },
      {
        path: 'product-catalogue',
        component: ProductCataloguesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'product-catalogue/:cloud_provider/:task_name',
        component: ProductCatalogueDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'products/:cloud_provider/:task_name/:item_id',
        component: ProductsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'user-guide',
        component: UserGuideComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'approval-inbox',
        component: ApprovalInboxComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'user-profile',
        component: UserProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'configuration/user-manager',
        component: UserManagerComponent,
        canActivate: [AuthGuard,AccessGuard],
      },
      {
        path: 'configuration/manage-oauth',
        component: ManageOauthComponent,
        canActivate: [AuthGuard,AccessGuard],
      },
      {
        path: 'configuration/manage-report',
        component: ManageReportComponent,
        canActivate: [AuthGuard,AccessGuard],
       },
       {
        path: 'reports',
        component: ReportsComponent,
        canActivate: [AuthGuard],
      },
       {
        path: 'monitoring',
        component: MonitoringComponent,
        canActivate: [AuthGuard],
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrchestrationLayoutRoutingModule {}
