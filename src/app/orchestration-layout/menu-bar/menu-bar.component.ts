import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AppService } from 'src/app/services/app.service';
import { NavService } from 'src/app/services/nav.service';
import { SideNavStateService } from 'src/app/services/sidenav-state.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit {
  menuItems: any;
  active = false;
  temp: any;
  adminFlag: boolean = false;
  data: any;
  selectedIndex: any=-1;

  constructor(
    private router: Router,
    private appService: AppService,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private navService: NavService
  ) {}

  ngOnInit(): void {
    this.adminFlag = this.route.snapshot.data.menuData[1].is_admin;
    this.navService.currentUrl.subscribe(
      (url: any) => {
        if (url) {
          url = url.split('?')[0];
          if(url.indexOf(`/dashboard`) !== -1){
            this.selectedIndex = 0;
          }
          if(url.indexOf(`/products/`) !== -1){
            this.selectedIndex = 1;
          }
          if(url.indexOf(`/configuration/`) !== -1){
            this.selectedIndex = 2;
          }
          if(url.indexOf(`/reports`) !== -1){
            this.selectedIndex = 3;
          }
          if(url.indexOf(`/monitoring`) !== -1){
            this.selectedIndex = 4;
          }
        }
      },
      (err: any) => {}
    );
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterContentInit(): void {
    this.menuItems = [
      {
        screen_name: 'Dashboard',
        mfUrlLink: '/orchestration/dashboard',
        mfIconPath: 'dashboard',
        display: true,
      },

      {
        screen_name: 'Product',
        mfUrlLink: '',
        mfIconPath: 'product_catalogue',
        display: true,
        subcategories: this.getProducts(),
      },
      {
        screen_name: 'Configuration',
        mfUrlLink: '/orchestration/configuration',
        mfIconPath: 'configuration',
        display: this.adminFlag,
        subcategories: [
          {
            screen_name: 'Config Management',
            mfUrlLink: '',
            mfIconPath: '',
            type: 'configuration',
            subcategories: [
              {
                screen_name: 'API Configuration',
                mfUrlLink: '/orchestration/configuration/api-configuration',
                mfIconPath: '',
                type: 'configuration',
              },
              {
                screen_name: 'System Configuration',
                mfUrlLink: '/orchestration/configuration/system-configuration',
                mfIconPath: '',
                type: 'configuration',
              },
              {
                screen_name: 'Setup Execution Plan',
                mfUrlLink: '/orchestration/configuration/setup-execution-plan',
                mfIconPath: '',
                type: 'configuration',
              },
              {
                screen_name: 'Task Configuration',
                mfUrlLink: '/orchestration/configuration/task-configuration',
                mfIconPath: '',
                type: 'configuration',
              },
            ],
          },
          {
            screen_name: 'System Management',
            mfUrlLink: '',
            mfIconPath: '',
            type: 'configuration',
            subcategories: [
              {
                screen_name: 'Manage Adapter',
                mfUrlLink: '/orchestration/configuration/manage-adapter',
                mfIconPath: '',
                type: 'configuration',
              },
              {
                screen_name: 'Manage Application',
                mfUrlLink: '/orchestration/configuration/manage-application',
                mfIconPath: '',
                type: 'configuration',
              },
              {
                screen_name: 'Manage Credentials',
                mfUrlLink: '/orchestration/configuration/manage-credentials',
                mfIconPath: '',
                type: 'configuration',
              },
              {
                screen_name: 'Manage Queue',
                mfUrlLink: '/orchestration/configuration/manage-queue',
                mfIconPath: '',
                type: 'configuration',
              },
              {
                screen_name: 'Config Audit',
                mfUrlLink: '/orchestration/configuration/config-audit',
                mfIconPath: '',
                type: 'configuration',
              },
              {
                screen_name: 'Manage Oauth',
                mfUrlLink: '/orchestration/configuration/manage-oauth',
                mfIconPath: '',
                type: 'configuration',
              },
              {
                screen_name: 'Manage Report',
                mfUrlLink: '/orchestration/configuration/manage-report',
                mfIconPath: '',
                type: 'configuration',
              }
            ],
          },
          {
            screen_name: 'User Management',
            mfUrlLink: '',
            mfIconPath: '',
            type: 'configuration',
            subcategories: [
              {
                screen_name: 'Manage Users',
                mfUrlLink: '/orchestration/configuration/user-manager',
                mfIconPath: '',
                type: 'configuration',
              },
            ]
          },
          {
            screen_name: 'Product Management',
            mfUrlLink: '',
            mfIconPath: '',
            type: 'configuration',
            subcategories: [
              {
                screen_name: 'Manage Category',
                mfUrlLink: '/orchestration/configuration/manage-category',
                mfIconPath: '',
                type: 'configuration',
              },
              {
                screen_name: 'Manage Sub Category',
                mfUrlLink: '/orchestration/configuration/manage-sub-category',
                mfIconPath: '',
                type: 'configuration',
              },
              {
                screen_name: 'Manage Product Items',
                mfUrlLink: '/orchestration/configuration/manage-product-item',
                mfIconPath: '',
                type: 'configuration',
              },
            ]
          },
          {
            screen_name: 'Credentials Manager',
            mfUrlLink: '',
            mfIconPath: '',
            type: 'configuration',
            subcategories: [
              {
                screen_name: 'Cloud Credentials',
                mfUrlLink: '/orchestration/configuration/cloud-credentials',
                mfIconPath: '',
                type: 'configuration',
              },
            ]
          }
        ],
      },
      {
        screen_name: 'Reports',
        mfUrlLink: '/orchestration/reports',
        mfIconPath: 'reports',
        display: true,
      },
      {
        screen_name: 'Monitoring',
        mfUrlLink: '/orchestration/monitoring',
        mfIconPath: 'monitoring',
        display: true,
      }
    ];
  }
  // onMenuItemClick(item: any): void {
  //   if (!item?.children?.length) {
  //     this.router.navigate([item.mfUrlLink]);
  //   }
  //   if (item.children && item.children.length) {
  //     if (this.router.url.includes(item.mfUrlLink)) {
  //       this.active = true;
  //     } else {
  //       this.active = false;
  //     }
  //   }
  // }
  getProducts(): any {
    const tmpArr: any[] = [...this.appService.productCategoryList.value];

    return tmpArr;
  }
}
