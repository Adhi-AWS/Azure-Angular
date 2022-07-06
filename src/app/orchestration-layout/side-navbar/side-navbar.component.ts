import { Component, Input, AfterContentInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { SideNavStateService } from 'src/app/services/sidenav-state.service';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss'],
})
export class SideNavbarComponent implements  AfterContentInit {
  @Input() stage: number | undefined;

  navItems: any;

  constructor(
    private appService: AppService,
    private sideNavStateService: SideNavStateService
  ) {}

  

  ngAfterContentInit(): void {
    this.navItems = [
      {
        mfName: 'Dashboard',
        mfUrlLink: '/orchestration/dashboard',
        mfIconPath: 'dashboard',
      },
      {
        mfName: 'Processor Insight',
        mfUrlLink: '/orchestration/processor-insight',
        mfIconPath: 'processor_insight',
      },
      {
        mfName: 'Transactions',
        mfUrlLink: '/orchestration/search',
        mfIconPath: 'search',
        children: this.createTransactionsChildren(),
      },
      {
        mfName: 'Configuration',
        mfUrlLink: '/orchestration/configuration',
        mfIconPath: 'configuration',
        children: [
          {
            mfName: 'API Configuration',
            mfUrlLink: '/orchestration/configuration/api-configuration',
            mfIconPath: '',
          },
          {
            mfName: 'Config Audit',
            mfUrlLink: '/orchestration/configuration/config-audit',
            mfIconPath: '',
          },
          {
            mfName: 'Manage Adapter',
            mfUrlLink: '/orchestration/configuration/manage-adapter',
            mfIconPath: '',
          },
          {
            mfName: 'Manage Application',
            mfUrlLink: '/orchestration/configuration/manage-application',
            mfIconPath: '',
          },
          {
            mfName: 'Manage Credentials',
            mfUrlLink: '/orchestration/configuration/manage-credentials',
            mfIconPath: '',
          },
          {
            mfName: 'Manage Queue',
            mfUrlLink: '/orchestration/configuration/manage-queue',
            mfIconPath: '',
          },
          {
            mfName: 'Setup Execution Plan',
            mfUrlLink: '/orchestration/configuration/setup-execution-plan',
            mfIconPath: '',
          },
          {
            mfName: 'System Configuration',
            mfUrlLink: '/orchestration/configuration/system-configuration',
            mfIconPath: '',
          },
          {
            mfName: 'Task Configuration',
            mfUrlLink: '/orchestration/configuration/task-configuration',
            mfIconPath: '',
          },
        ],
      },
      {
        mfName: 'Product Catalogue',
        mfUrlLink: '/orchestration/product-catalogue',
        mfIconPath: 'product_catalogue',
      },
      {
        mfName: 'User Guide',
        mfUrlLink: '/orchestration/user-guide',
        mfIconPath: 'user_guide',
      },
    ];
  }

  createTransactionsChildren(): any[] {
    const tmpArr: any[] = [...this.appService.cloud_providers_list.value];
    tmpArr.sort((a, b) => (a.cloud_provider > b.cloud_provider ? 1 : -1));

    const returnValue: any[] = [];
    tmpArr.forEach((item: any) => {
      returnValue.push({
        mfName: item.screen_name,
        mfUrlLink: `/orchestration/search/${item.cloud_provider}/transactions`,
        mfIconPath: '',
      });
    });

    return returnValue;
  }

  getSideNavState(): number {
    return this.sideNavStateService.currentState.stage || 0;
  }
}
