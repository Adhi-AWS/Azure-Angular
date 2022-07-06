import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TransactionsService } from 'src/app/services/transactions.service';
import { ViewJsonDialogComponent } from 'src/app/shared/view-json-dialog/view-json-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorManagementService } from 'src/app/services/error-management.service';

@Component({
  selector: 'app-task-response',
  templateUrl: './task-response.component.html',
  styleUrls: ['./task-response.component.scss'],
})
export class TaskResponseComponent implements OnInit {
  taskId: string = '';
  taskResponse: any = null;

  step = 0;

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
    this.transactionsService.getResponseDetails(this.taskId).subscribe(
      (response: any) => {
        if (response && response.details) {
          this.taskResponse = { ...response };
        } else {
          this.taskResponse = {};
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
