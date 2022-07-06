/* eslint-disable security/detect-object-injection */
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { ErrorManagementService } from 'src/app/services/error-management.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { JsonEditorDialogComponent } from 'src/app/shared/json-editor-dialog/json-editor-dialog.component';
import { ViewJsonDialogComponent } from 'src/app/shared/view-json-dialog/view-json-dialog.component';
import { TaskTransitionLogsComponent } from './task-transition-logs/task-transition-logs.component';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss'],
})
export class TransactionDetailsComponent implements OnInit, OnDestroy {
  taskId: string = '';
  transactionDetails: any = null;

  showRetry: boolean = false;
  showRollback: boolean = false;
  isRollback: boolean = false;

  stateFlowData: any[] = [];
  tmpStateFlowData: any[] = [];

  subscription: Subscription | undefined;

  source = interval(10000);
  adminFlag:any=false;

  @ViewChild(TaskTransitionLogsComponent)
  transitionLogsRef!: TaskTransitionLogsComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private dialog: MatDialog,
    private location: Location,
    private transactionsService: TransactionsService,
    private errorManagementService: ErrorManagementService
  ) {
    this.taskId = this.route.snapshot.paramMap.get('task_id') || '';
  }

  ngOnInit(): void {
    this.transactionsService.setApiReqCount(0);

    this.fetchRequestData();

    this.subscription = this.source.subscribe(() => {
      this.fetchRequestData();
    });
    this.adminService.isAdmin().subscribe((response)=>{
      this.adminFlag = response.is_admin;
   })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onBackClick(): void {
    //this.location.back();
    this.router.navigateByUrl(`/orchestration/transactions`);
  }

  onRetryClick(): void {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const dialogRef: any = this.dialog.open(JsonEditorDialogComponent, {
      minWidth: '50%',
      data: {
        payload: this.transitionLogsRef.transitionLogData[0].payload || {},
      },
    });

    dialogRef.afterClosed().subscribe((payload: any) => {
      if (payload) {
        this.transactionsService.retryTransaction(payload).subscribe(
          (response: any) => {
            if (response && response.task_id === this.taskId) {
              setTimeout(() => {
                const currentRoute = this.router.url;
                this.router
                  .navigateByUrl('orchestration/transactions', { skipLocationChange: true })
                  .then(() => {
                    this.router.navigate([currentRoute]); // navigate to same route
                  });
              }, 2000);
            }
          },
          (error: any) => {
            if (error instanceof HttpErrorResponse) {
              this.errorManagementService.handleApiError(
                'Retry Transaction',
                error
              );
            }
          }
        );
      }
    });
  }

  onRollbackClick(): void {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const dialogRef: any = this.dialog.open(JsonEditorDialogComponent, {
      minWidth: '50%',
      data: { payload: this.transactionDetails },
    });

    dialogRef.afterClosed().subscribe((payload: any) => {
      if (payload) {
        this.transactionsService.rollbackTransaction(payload).subscribe(
          (response: any) => {
            if (response && response.task_id === this.taskId) {
              setTimeout(() => {
                const currentRoute = this.router.url;
                this.router
                  .navigateByUrl('orchestration/transactions', { skipLocationChange: true })
                  .then(() => {
                    this.router.navigate([currentRoute]); // navigate to same route
                  });
              }, 2000);
            }
          },
          (error: any) => {
            if (error instanceof HttpErrorResponse) {
              this.errorManagementService.handleApiError(
                'Rollback Transaction',
                error
              );
            }
          }
        );
      }
    });
  }

  jsonStringfied(json: any): string {
    return JSON.stringify(json);
  }

  fetchRequestData(): void {
    this.transactionsService.setApiReqCount(
      this.transactionsService.apiReqCountSubject$.value + 1
    );

    this.transactionsService
      .getTransactionDetails(this.taskId, 'request')
      .subscribe(
        (response: any) => {
          if (response && response.length) {
            this.transactionDetails = { ...response[0] };
            if(this.transactionDetails.status == 'FAILED'){
              this.subscription?.unsubscribe();
            }
            this.isRollback = this.transactionDetails.rollback;
            this.fetchStateTransitionDetails();
          } else {
            this.transactionDetails = {};
          }
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            this.errorManagementService.handleApiError(
              'Transaction Request',
              error
            );
          }
        }
      );
  }

  fetchStateTransitionDetails(): void {
    this.tmpStateFlowData = [];
    this.showRollback = false;
    this.showRetry = false;

    this.transactionsService.getStateDetails(this.taskId).subscribe(
      (response: any) => {
        if (response && Object.keys(response).length) {
          const states: string[] = Object.keys(response);

          this.tmpStateFlowData.push({
            status: 'success',
            state: 'Start',
            end: false,
            timestamp: this.transactionDetails.created_date || null,
            message: null,
            parallel_states: null,
          });

          this.generateFlow(response, states[0]);

          this.stateFlowData = [...this.tmpStateFlowData];
        } else {
          this.stateFlowData = [];
        }
      },
      (error: any) => {
        if (error instanceof HttpErrorResponse) {
          this.errorManagementService.handleApiError('State Transition', error);
        }
      }
    );
  }

  generateFlow(stateResponse: any, currentState: string): void {
    this.tmpStateFlowData.push({
      // eslint-disable-next-line security/detect-object-injection
      status: stateResponse[currentState].status.toLowerCase(),
      state: currentState === 'EndExecution' ? 'End' : currentState,
      end: currentState === 'EndExecution' ? true : false,
      // eslint-disable-next-line security/detect-object-injection
      timestamp: stateResponse[currentState].timestamp || null,
      technology: currentState !== 'EndExecution' ?
      // eslint-disable-next-line security/detect-object-injection
      (stateResponse[currentState].technology==null ? 'terraform' : stateResponse[currentState].technology) : null,
      // eslint-disable-next-line security/detect-object-injection
      message: stateResponse[currentState].message
        // eslint-disable-next-line security/detect-object-injection
        ? JSON.parse(stateResponse[currentState].message)
        : null,
      // eslint-disable-next-line security/detect-object-injection
      parallel_tasks: this.getParallelStates(stateResponse[currentState]),
    });

    if (
      this.isRollback &&
      (['failure', 'failed', 'error'].includes(
        stateResponse[currentState].status.toLowerCase()
      ) ||
        (currentState === 'EndExecution' &&
          ['finished', 'success', 'complete', 'completed'].includes(
            stateResponse[currentState].status.toLowerCase()
          )))
    ) {
      this.showRollback = true;
    }

    if (
      [
        'in queue',
        'in_queue',
        'in-queue',
        'recieved',
        'received',
        'failure',
        'failed',
        'error',
      ].includes(stateResponse[currentState].status.toLowerCase())
    ) {
      this.showRetry = true;
    }

    if (currentState !== 'EndExecution') {
      if (
        this.isRollback &&
        stateResponse[currentState].rollback &&
        ['failure', 'failed', 'error'].includes(
          stateResponse[currentState].status.toLowerCase()
        )
      ) {
        this.generateFlow(stateResponse, stateResponse[currentState].rollback);
      } else {
        this.generateFlow(stateResponse, stateResponse[currentState].success);
      }
    }
  }

  getParallelStates(taskObj: any): any {
    if (taskObj) {
      try {
        const parallel_tasks: string[] = Object.keys(taskObj.parallel_tasks);
        const parallel_tasks_list: any[] = [];

        parallel_tasks.forEach((item: any) => {
          parallel_tasks_list.push({
            status: taskObj.parallel_tasks[item].status.toLowerCase(),
            state: item,
            timestamp: taskObj.parallel_tasks[item].timestamp || null,
            message: taskObj.parallel_tasks[item].message
              ? JSON.parse(taskObj.parallel_tasks[item].message)
              : null,
          });
        });

        return parallel_tasks_list;
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  openViewJsonDialog(name: string, value: any): void {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    this.dialog.open(ViewJsonDialogComponent, {
      minWidth: '50%',
      data: {
        title: name,
        data: value,
      },
    });
  }
}
