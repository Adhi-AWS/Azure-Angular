import { Component, HostListener, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-shared-view-parallel-tasks-dialog',
  templateUrl: './view-parallel-tasks-dialog.component.html',
  styleUrls: ['./view-parallel-tasks-dialog.component.scss'],
})
export class ViewParallelTasksDialogComponent  {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private mdDialogRef: MatDialogRef<ViewParallelTasksDialogComponent>
  ) {}

  

  close(value: any = false): void {
    this.mdDialogRef.close(value);
  }

  @HostListener('keydown.esc')
  onEsc(): void {
    this.close(false);
  }
}
