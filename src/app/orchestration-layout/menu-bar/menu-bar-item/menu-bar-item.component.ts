import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavService } from 'src/app/services/nav.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-menu-bar-item',
  templateUrl: './menu-bar-item.component.html',
  styleUrls: ['./menu-bar-item.component.scss'],
})
export class MenuBarItemComponent  {
  @Input() item: any;
  @Input() category: any;
  @Input() depth = 0;
  @ViewChild('childMenu') public childMenu: any;

  active = false;

  constructor(private router: Router, private navService: NavService) {}

  

  onMenuItemClick(menu: any, item: any): void {
    if (!item?.subcategories?.length) {
      if (item.type && item.type == 'configuration') {
        this.router.navigate([item.mfUrlLink]);
      } else {
        if (item.id) {
          this.router.navigate([
            'orchestration/products/' +
              `${menu.cloud_provider}/${item.screen_name}/${item.id}`,
          ]);
        }
      }
    }
  }
}
