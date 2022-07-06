import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WorkBench } from 'src/app/models/workbench.model';
import { AlertService } from 'src/app/services/alert.service';
import { ErrorManagementService } from 'src/app/services/error-management.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { JsonEditorDialogComponent } from 'src/app/shared/json-editor-dialog/json-editor-dialog.component';

@Component({
  selector: 'app-test-workbench',
  templateUrl: './test-workbench.component.html',
  styleUrls: ['./test-workbench.component.scss'],
})
export class TestWorkbenchComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  payLoadDataObs: Observable<any> | undefined;
  dataSource: any;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private dialog: MatDialog,
    private transactionsService: TransactionsService,
    private alertService: AlertService,
    private errorManagementService: ErrorManagementService
  ) {}

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();

    this.transactionsService.getWorkbenchDetails().subscribe(
      (response: WorkBench[]) => {
        this.dataSource = new MatTableDataSource<WorkBench>([...response]);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.payLoadDataObs = this.dataSource.connect();
        });
      },
      (error: any) => {
        this.dataSource = new MatTableDataSource<WorkBench>([]);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.payLoadDataObs = this.dataSource.connect();
        });
        if (error instanceof HttpErrorResponse) {
          this.errorManagementService.handleApiError('Test Workbench', error);
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDeployClick(payload: any): void {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const dialogRef: any = this.dialog.open(JsonEditorDialogComponent, {
      minWidth: '50%',
      data: payload,
    });

    dialogRef.afterClosed().subscribe((updatedPayload: any) => {
      if (updatedPayload) {
        this.transactionsService.retryTransaction(updatedPayload).subscribe(
          (response: any) => {
            this.alertService.showMessage(
              'Deploy Transaction',
              `Deployed a transaction id: ${response.id} successfully.`,
              true,
              {
                callback: () => {
                  this.router.navigateByUrl(
                    `/orchestration/transactions/${response.task_id}`
                  );
                  return true;
                },
              }
            );
          },
          (error: any) => {
            if (error instanceof HttpErrorResponse) {
              this.errorManagementService.handleApiError(
                'Deploy Transaction',
                error
              );
            }
          }
        );
      }
    });
  }
}
