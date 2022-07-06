import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorManagementService } from 'src/app/services/error-management.service';
import { ProductCatalogueService } from 'src/app/services/product-catalogue.service';

@Component({
  selector: 'app-product-catalogues',
  templateUrl: './product-catalogues.component.html',
  styleUrls: ['./product-catalogues.component.scss'],
})
export class ProductCataloguesComponent implements OnInit {
  totalAutomationCount: number = 0;
  productCatalogueData: { [key: string]: [value: string] } = {};
  filteredProductCatalogueData: { [key: string]: [value: string] } = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productCatalogueService: ProductCatalogueService,
    private errorManagementService: ErrorManagementService
  ) {}

  ngOnInit(): void {
    this.totalAutomationCount = 0;

    this.productCatalogueService.getProductCatalogueList().subscribe(
      (response: any) => {
        if (response) {
          this.filteredProductCatalogueData = { ...response };
          this.productCatalogueData = { ...response };
          Object.keys(this.productCatalogueData).forEach((item: string) => {
            // eslint-disable-next-line security/detect-object-injection
            this.totalAutomationCount += this.productCatalogueData[item].length;
          });
        }
      },
      (error: any) => {
        if (error instanceof HttpErrorResponse) {
          this.errorManagementService.handleApiError(
            'Product Catalogue',
            error
          );
        }
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    if (!filterValue.trim().toLowerCase()) {
      this.filteredProductCatalogueData = { ...this.productCatalogueData };
    } else {
      const tmpData: any = {};
      for (let [key, value] of Object.entries(this.productCatalogueData)) {
        const tasks: string[] = value.filter((item: string) =>
          item.toLowerCase().includes(filterValue.trim().toLowerCase())
        );
        if (tasks.length) {
          // eslint-disable-next-line security/detect-object-injection
          tmpData[key] = [...tasks];
        }
      }

      this.filteredProductCatalogueData = { ...tmpData };
    }
  }

  onTaskNameClick(cloud_provider: any, task_name: string): void {
    this.router.navigate([`${cloud_provider}/${task_name}`], {
      relativeTo: this.route,
    });
  }
}
