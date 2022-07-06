import { Component, HostListener, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-app-view-report-dialog',
  templateUrl: './app-view-report-dialog.component.html',
  styleUrls: ['./app-view-report-dialog.component.scss']
})
export class AppViewReportDialogComponent  {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private mdDialogRef: MatDialogRef<AppViewReportDialogComponent>
  ) { }

  

  close(value: any = false): void {
    this.mdDialogRef.close(value);
  }

  @HostListener('keydown.esc')
  onEsc(): void {
    this.close(false);
  }

}
