import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class CustomMatIconService {
  iconList = [
    {
      iconName: 'dashboard',
      iconURL: '/assets/mat-svg-icons/dashboard.svg',
    },
    {
      iconName: 'dashboard_active',
      iconURL: '/assets/mat-svg-icons/dashboard-active.svg',
    },
    {
      iconName: 'processor_insight',
      iconURL: '/assets/mat-svg-icons/processor-insight.svg',
    },
    {
      iconName: 'processor_insight_active',
      iconURL: '/assets/mat-svg-icons/processor-insight-active.svg',
    },
    {
      iconName: 'search',
      iconURL: '/assets/mat-svg-icons/search.svg',
    },
    {
      iconName: 'search_active',
      iconURL: '/assets/mat-svg-icons/search-active.svg',
    },
    {
      iconName: 'configuration',
      iconURL: '/assets/mat-svg-icons/configuration.svg',
    },
    {
      iconName: 'configuration_active',
      iconURL: '/assets/mat-svg-icons/configuration-active.svg',
    },
    {
      iconName: 'product_catalogue',
      iconURL: '/assets/mat-svg-icons/product-catalogue.svg',
    },
    {
      iconName: 'product_catalogue_active',
      iconURL: '/assets/mat-svg-icons/product-catalogue-active.svg',
    },
    {
      iconName: 'user_guide',
      iconURL: '/assets/mat-svg-icons/user-guide.svg',
    },
    {
      iconName: 'user_guide_active',
      iconURL: '/assets/mat-svg-icons/user-guide-active.svg',
    },
    {
      iconName: 'arrows',
      iconURL: '/assets/mat-svg-icons/arrows.svg',
    },
    {
      iconName: 'alert',
      iconURL: '/assets/mat-svg-icons/alert.svg',
    },
    {
      iconName: 'chevron_left',
      iconURL: '/assets/mat-svg-icons/chevron-left.svg',
    },
    {
      iconName: 'success',
      iconURL: '/assets/mat-svg-icons/success.svg',
    },
    {
      iconName: 'failed',
      iconURL: '/assets/mat-svg-icons/failed.svg',
    },
    {
      iconName: 'in_progress',
      iconURL: '/assets/mat-svg-icons/in-progress.svg',
    },
    {
      iconName: 'not_initiated',
      iconURL: '/assets/mat-svg-icons/not-initiated.svg',
    },
    {
      iconName: 'in_queue',
      iconURL: '/assets/mat-svg-icons/in-queue.svg',
    },
  ];
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {}

  registerIcons(): void {
    this.iconList.forEach((icon) => {
      this.matIconRegistry.addSvgIcon(
        icon.iconName,
        this.domSanitizer.bypassSecurityTrustResourceUrl(icon.iconURL)
      );
    });
  }
}
