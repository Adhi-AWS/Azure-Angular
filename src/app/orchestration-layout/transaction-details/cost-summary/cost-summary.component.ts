import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TransactionsService } from 'src/app/services/transactions.service';
import { ViewJsonDialogComponent } from 'src/app/shared/view-json-dialog/view-json-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorManagementService } from 'src/app/services/error-management.service';

@Component({
  selector: 'app-cost-summary',
  templateUrl: './cost-summary.component.html',
  styleUrls: ['./cost-summary.component.scss'],
})
export class CostSummaryComponent implements OnInit {
  taskId: string = '';
  taskResponse: any[]=[];
  totalCost:number=0;
  totalSupportedResources:number=0;
  totalUnsupportedResources:number=0;
  totalNoPriceResources:number=0;
  totalDetectedResources:number=0;
  totalUsageBasedResources:number=0;
  step = 0;
  panelOpenState = false;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private transactionsService: TransactionsService,
    private errorManagementService: ErrorManagementService
  ) {
    this.taskId = this.route.snapshot.paramMap.get('task_id') || '';
  }

  ngOnInit(): void {
    this.fetchResponseData();
  }

  fetchResponseData(): void {
    this.totalCost=0;
    this.transactionsService.getCostDetails(this.taskId).subscribe(
      (response: any) => {
        if (response) {
          this.taskResponse = response;
          this.taskResponse.forEach((item)=>{
          this.totalCost = this.totalCost + Number(item.cost_json.totalMonthlyCost);
          this.totalSupportedResources = this.totalSupportedResources + item.cost_json.summary.totalSupportedResources;
          this.totalUnsupportedResources = this.totalUnsupportedResources + item.cost_json.summary.totalUnsupportedResources;
          this.totalNoPriceResources = this.totalNoPriceResources + item.cost_json.summary.totalNoPriceResources;
          this.totalDetectedResources = this.totalDetectedResources + item.cost_json.summary.totalDetectedResources;
          this.totalUsageBasedResources = this.totalUsageBasedResources + item.cost_json.summary.totalUsageBasedResources;
          })
        } else {
          this.taskResponse = [];
        }
      },
      (error: any) => {
        if (error instanceof HttpErrorResponse) {
          this.errorManagementService.handleApiError(
            'Transaction response',
            error
          );
        }
      }
    );
  }

  setStep(index: number): void {
    this.step = index;
  }

  nextStep(): void {
    this.step++;
  }

  prevStep(): void {
    this.step--;
  }

  openViewJsonDialog(name: string): void {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    this.dialog.open(ViewJsonDialogComponent, {
      minWidth: '50%',
      data: {
        title: name,
        data: this.taskResponse,
      },
    });
  }
}
