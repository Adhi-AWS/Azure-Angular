import { Component, HostListener, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-application-dialog',
  templateUrl: './view-application-dialog.component.html',
  styleUrls: ['./view-application-dialog.component.scss'],
})
export class ViewApplicationDialogComponent  {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private mdDialogRef: MatDialogRef<ViewApplicationDialogComponent>
  ) {}

  

  close(value: any = false): void {
    this.mdDialogRef.close(value);
  }

  @HostListener('keydown.esc')
  onEsc(): void {
    this.close(false);
  }
}
