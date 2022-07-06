import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { OrchestrationLayoutRoutingModule } from './orchestration-layout-routing.module';
import { OrchestrationLayoutComponent } from './orchestration-layout.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { SideNavListItemComponent } from './side-navbar/side-nav-list-item/side-nav-list-item.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MaterialModule } from '../material/material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProcessorInsightComponent } from './processor-insight/processor-insight.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ApprovalInboxComponent } from './approval-inbox/approval-inbox.component';
import { ManageApplicationComponent } from './manage-application/manage-application.component';
import { AddUpdateApplicationDialogComponent } from './manage-application/add-update-application-dialog/add-update-application-dialog.component';
import { ViewApplicationDialogComponent } from './manage-application/view-application-dialog/view-application-dialog.component';
import { SetupExecutionPlanComponent } from './setup-execution-plan/setup-execution-plan.component';
import { ManageCredentialsComponent } from './manage-credentials/manage-credentials.component';
import { SystemConfigurationComponent } from './system-configuration/system-configuration.component';
import { UpdateSystemConfigurationDialogComponent } from './system-configuration/update-system-configuration-dialog/update-system-configuration-dialog.component';
import { ConfigAuditComponent } from './config-audit/config-audit.component';
import { ManageAdapterComponent } from './manage-adapter/manage-adapter.component';
import { AddAdapterDialogComponent } from './manage-adapter/add-adapter-dialog/add-adapter-dialog.component';
import { ManageQueueComponent } from './manage-queue/manage-queue.component';
import { AddUpdateQueueDialogComponent } from './manage-queue/add-update-queue-dialog/add-update-queue-dialog.component';
import { MapAdapterDialogComponent } from './manage-queue/map-adapter-dialog/map-adapter-dialog.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { TaskRequestComponent } from './transaction-details/task-request/task-request.component';
import { TaskResponseComponent } from './transaction-details/task-response/task-response.component';
import { TaskTransitionLogsComponent } from './transaction-details/task-transition-logs/task-transition-logs.component';
import { TaskAuditLogsComponent } from './transaction-details/task-audit-logs/task-audit-logs.component';
import { ProductCataloguesComponent } from './product-catalogues/product-catalogues.component';
import { ProductCatalogueDetailsComponent } from './product-catalogue-details/product-catalogue-details.component';
import { UserGuideComponent } from './user-guide/user-guide.component';
import { TableComponent } from '../shared/table/table.component';
import { KeyValueTableComponent } from '../shared/keyvalue-table/keyvalue-table.component';
import { FlowComponent } from '../shared/flow/flow.component';
import { ViewJsonDialogComponent } from '../shared/view-json-dialog/view-json-dialog.component';
import { PrettyJsonModule } from 'angular2-prettyjson';
import { StatusIconPipe } from '../shared/pipes/status-icon.pipe';
import { JsonEditorDialogComponent } from '../shared/json-editor-dialog/json-editor-dialog.component';
import { AddUpdateCredentialDialogComponent } from './manage-credentials/add-update-credential-dialog/add-update-credential-dialog.component';
import { AutomationPlanComponent } from './setup-execution-plan/automation-plan/automation-plan.component';
import { AutomationCodeComponent } from './setup-execution-plan/automation-code/automation-code.component';
import { AddUpdatePlanDialogComponent } from './setup-execution-plan/automation-plan/add-update-plan-dialog/add-update-plan-dialog.component';
import { AddUpdateCodeDialogComponent } from './setup-execution-plan/automation-code/add-update-code-dialog/add-update-code-dialog.component';
import { MonthDatepickerComponent } from '../shared/month-datepicker/month-datepicker.component';
import { DatepickerComponent } from '../shared/datepicker/datepicker.component';
import { C3BarChartComponent } from '../shared/c3-bar-chart/c3-bar-chart.component';
import { C3PieChartComponent } from '../shared/c3-pie-chart/c3-pie-chart.component';
import { TaskConfigurationComponent } from './task-configuration/task-configuration.component';
import { AddUpdateTaskConfigurationDialogComponent } from './task-configuration/add-update-task-configuration-dialog/add-update-task-configuration-dialog.component';
import { ApiConfigurationComponent } from './api-configuration/api-configuration.component';
import { AddUpdateApiConfigurationDialogComponent } from './api-configuration/add-update-api-configuration-dialog/add-update-api-configuration-dialog.component';
import { ViewParallelTasksDialogComponent } from '../shared/flow/view-parallel-tasks-dialog/view-parallel-tasks-dialog.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { MenuBarItemComponent } from './menu-bar/menu-bar-item/menu-bar-item.component';
import { ProductsComponent } from './products/products.component';
import { MaterialDesignFrameworkModule } from '@ajsf/material';
import { ProductConfigComponent } from './product-config/product-config.component';
import { FooterComponent } from './footer/footer.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { AppAddUpdateUserDialogComponent } from './user-manager/app-add-update-user-dialog/app-add-update-user-dialog.component';
import { AppViewUserDialogComponent } from './user-manager/app-view-user-dialog/app-view-user-dialog.component';
import { AddUpdateManageCategoryComponent } from './manage-category/add-update-manage-category/add-update-manage-category/add-update-manage-category.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { AddUpdateManageSubCategoryComponent } from './manage-sub-category/add-update-manage-sub-category/add-update-manage-sub-category/add-update-manage-sub-category.component';
import { ManageSubCategoryComponent } from './manage-sub-category/manage-sub-category.component';
import { CloudCredentialsComponent } from './cloud-credentials/cloud-credentials.component';
import { AddUpdateCloudCredentialDialogComponent } from './cloud-credentials/add-update-credential-dialog/add-update-credential-dialog.component';
import { ManageProductItemComponent } from './manage-product-item/manage-product-item/manage-product-item.component';
import { CostSummaryComponent } from './transaction-details/cost-summary/cost-summary.component';
import { ManageOauthComponent } from './manage-oauth/manage-oauth.component';
import { AppAddUpdateOauthDialogComponent } from './manage-oauth/app-add-update-oauth-dialog/app-add-update-oauth-dialog.component';
import { AppViewOauthDialogComponent } from './manage-oauth/app-view-oauth-dialog/app-view-oauth-dialog.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { AddRoleComponent } from './manage-role/add-role/add-role.component';
import { ManageReportComponent } from './manage-report/manage-report.component';
import { AppAddUpdateReportDialogComponent } from './manage-report/app-add-update-report-dialog/app-add-update-report-dialog.component';
import { AppViewReportDialogComponent } from './manage-report/app-view-report-dialog/app-view-report-dialog.component';
import { ReportsComponent } from './reports/reports.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { LicenseDetailComponent } from './user-header/license-detail/license-detail.component';

@NgModule({
  declarations: [
    OrchestrationLayoutComponent,
    UserHeaderComponent,
    SideNavbarComponent,
    SideNavListItemComponent,
    UserProfileComponent,
    DashboardComponent,
    ProcessorInsightComponent,
    TransactionsComponent,
    ApprovalInboxComponent,
    TransactionDetailsComponent,
    TaskRequestComponent,
    TaskResponseComponent,
    TaskTransitionLogsComponent,
    TaskAuditLogsComponent,
    ManageApplicationComponent,
    AddUpdateApplicationDialogComponent,
    ViewApplicationDialogComponent,
    SetupExecutionPlanComponent,
    AutomationPlanComponent,
    AddUpdatePlanDialogComponent,
    AutomationCodeComponent,
    AddUpdateCodeDialogComponent,
    ManageCredentialsComponent,
    AddUpdateCredentialDialogComponent,
    SystemConfigurationComponent,
    UpdateSystemConfigurationDialogComponent,
    ConfigAuditComponent,
    ManageAdapterComponent,
    AddAdapterDialogComponent,
    ManageQueueComponent,
    AddUpdateQueueDialogComponent,
    MapAdapterDialogComponent,
    ProductCataloguesComponent,
    ProductCatalogueDetailsComponent,
    UserGuideComponent,
    TableComponent,
    KeyValueTableComponent,
    FlowComponent,
    ViewParallelTasksDialogComponent,
    StatusIconPipe,
    ViewJsonDialogComponent,
    JsonEditorDialogComponent,
    MonthDatepickerComponent,
    DatepickerComponent,
    C3BarChartComponent,
    C3PieChartComponent,
    TaskConfigurationComponent,
    AddUpdateTaskConfigurationDialogComponent,
    ApiConfigurationComponent,
    AddUpdateApiConfigurationDialogComponent,
    MenuBarComponent,
    MenuBarItemComponent,
    ProductsComponent,
    ProductConfigComponent,
    FooterComponent,
    UserManagerComponent,
    AppAddUpdateUserDialogComponent,
    AppViewUserDialogComponent,
    ManageCategoryComponent,
    AddUpdateManageCategoryComponent,
    ManageSubCategoryComponent,
    AddUpdateManageSubCategoryComponent,
    CloudCredentialsComponent,
    AddUpdateCloudCredentialDialogComponent,
    ManageProductItemComponent,
    CostSummaryComponent,
    ManageOauthComponent,
    AppAddUpdateOauthDialogComponent,
    AppViewOauthDialogComponent,
    ManageRoleComponent,
    AddRoleComponent,
    ManageReportComponent,
    AppAddUpdateReportDialogComponent,
    AppViewReportDialogComponent,
    ReportsComponent,
    MonitoringComponent,
    LicenseDetailComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    OrchestrationLayoutRoutingModule,
    MaterialDesignFrameworkModule,
    PrettyJsonModule,
    PdfViewerModule,
    AngularEditorModule,
  ],
})
export class OrchestrationLayoutModule {}
