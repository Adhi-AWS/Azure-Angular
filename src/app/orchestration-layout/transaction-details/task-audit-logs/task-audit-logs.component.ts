import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorManagementService } from 'src/app/services/error-management.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-task-audit-logs',
  templateUrl: './task-audit-logs.component.html',
  styleUrls: ['./task-audit-logs.component.scss'],
})
export class TaskAuditLogsComponent implements OnInit {
  taskId: string = '';
  auditLogColumns: any[] = [
    {
      colRefName: 'timestamp',
      colDisplayName: 'Timestamp',
      isAnchorLink: false,
    },
    {
      colRefName: 'source',
      colDisplayName: 'Source',
      isAnchorLink: false,
    },
    {
      colRefName: 'event',
      colDisplayName: 'Event',
      isAnchorLink: false,
    },
    {
      colRefName: 'trace',
      colDisplayName: 'Trace',
      isAnchorLink: false,
    },
    {
      colRefName: 'status',
      colDisplayName: 'Status',
      isAnchorLink: false,
    },
  ];

  auditLogData: any = null;

  constructor(
    private route: ActivatedRoute,
    private transactionsService: TransactionsService,
    private errorManagementService: ErrorManagementService
  ) {
    this.taskId = this.route.snapshot.paramMap.get('task_id') || '';
  }

  ngOnInit(): void {
    this.getAuditLogs();
  }

  getAuditLogs(): void {
    this.transactionsService
      .getTransactionDetails(this.taskId, 'audit_log')
      .subscribe(
        (response: any) => {
          if (response && response.length) {
            this.auditLogData = [...response];
          } else {
            this.auditLogData = [];
          }
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            this.errorManagementService.handleApiError('Audit Log', error);
          }
        }
      );
  }
}
