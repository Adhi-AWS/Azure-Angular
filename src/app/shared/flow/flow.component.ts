/* eslint-disable security/detect-non-literal-fs-filename */
import {
  Component,
  Input,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewJsonDialogComponent } from '../view-json-dialog/view-json-dialog.component';
import { ViewParallelTasksDialogComponent } from './view-parallel-tasks-dialog/view-parallel-tasks-dialog.component';

@Component({
  selector: 'app-shared-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss'],
})
export class FlowComponent implements OnInit {
  @Input() data: any;

  flowData: any = null;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.flowData = [...this.data];
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges): void {
    const dataChange: SimpleChange = changes.data;
    if (
      !dataChange.firstChange &&
      JSON.stringify(dataChange.previousValue) !==
        JSON.stringify(dataChange.currentValue)
    ) {
      this.flowData = [...dataChange.currentValue];
    }
  }

  openViewJsonDialog(obj: any): void {
    if (obj.message) {
      this.dialog.open(ViewJsonDialogComponent, {
        minWidth: '50%',
        data: {
          title: 'Status Message',
          data: obj.message,
          parallel_tasks_list: obj.parallel_tasks,
        },
      });
    }
  }

  viewParallelTasks(state: string, parallel_tasks: any): void {
    this.dialog.open(ViewParallelTasksDialogComponent, {
      minWidth: '50%',
      data: {
        title: state,
        parallel_tasks_list: parallel_tasks,
      },
    });
  }
}
