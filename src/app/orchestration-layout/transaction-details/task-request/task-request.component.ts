import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewJsonDialogComponent } from 'src/app/shared/view-json-dialog/view-json-dialog.component';

@Component({
  selector: 'app-task-request',
  templateUrl: './task-request.component.html',
  styleUrls: ['./task-request.component.scss'],
})
export class TaskRequestComponent implements OnInit {
  @Input() taskRequestData: any = null;
  requestDetails: any = null;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.taskRequestData && Object.keys(this.taskRequestData).length) {
      const tmpData = { ...this.taskRequestData };
      delete tmpData.parameters;
      delete tmpData.references;
      this.requestDetails = {
        ...tmpData,
        ...this.taskRequestData.parameters,
        ...this.taskRequestData.references,
      };
    }
  }

  openViewJsonDialog(name: string): void {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    this.dialog.open(ViewJsonDialogComponent, {
      minWidth: '50%',
      data: {
        title: name,
        data: this.taskRequestData,
      },
    });
  }
}
