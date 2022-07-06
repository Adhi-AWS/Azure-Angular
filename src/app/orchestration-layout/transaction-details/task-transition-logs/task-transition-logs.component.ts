import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorManagementService } from 'src/app/services/error-management.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-task-transition-logs',
  templateUrl: './task-transition-logs.component.html',
  styleUrls: ['./task-transition-logs.component.scss'],
})
export class TaskTransitionLogsComponent implements OnInit {
  taskId: string = '';
  transitionLogColumns: any[] = [
    {
      colRefName: 'created_timestamp',
      colDisplayName: 'Created Timestamp',
      isAnchorLink: false,
    },
    {
      colRefName: 'current_state',
      colDisplayName: 'State',
      isAnchorLink: false,
    },
    {
      colRefName: 'current_status',
      colDisplayName: 'Status',
      isAnchorLink: false,
    },
    /*{
      colRefName: 'identifier',
      colDisplayName: 'Identifier',
      isAnchorLink: false,
    },*/
    {
      colRefName: 'payload',
      colDisplayName: 'Payload',
      isAnchorLink: false,
    },
    {
      colRefName: 'kv_log',
      colDisplayName: 'KV Log',
      isAnchorLink: false,
    },
  ];

  transitionLogData: any = null;

  constructor(
    private route: ActivatedRoute,
    private transactionsService: TransactionsService,
    private errorManagementService: ErrorManagementService
  ) {
    this.taskId = this.route.snapshot.paramMap.get('task_id') || '';
  }

  ngOnInit(): void {
    this.getTransitionLogs();
  }

  getTransitionLogs(): void {
    this.transactionsService
      .getTransactionDetails(this.taskId, 'transition')
      .subscribe(
        (response: any) => {
          if (response && response.length) {
            this.transitionLogData = [...response];
          } else {
            this.transitionLogData = [];
          }
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            this.errorManagementService.handleApiError('Transition Log', error);
          }
        }
      );
  }
}
