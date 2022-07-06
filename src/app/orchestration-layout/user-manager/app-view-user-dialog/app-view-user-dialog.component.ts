import { Component, HostListener, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-app-view-user-dialog',
  templateUrl: './app-view-user-dialog.component.html',
  styleUrls: ['./app-view-user-dialog.component.scss']
})
export class AppViewUserDialogComponent  {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private mdDialogRef: MatDialogRef<AppViewUserDialogComponent>
  ) {}

  

  close(value: any = false): void {
    this.mdDialogRef.close(value);
  }

  @HostListener('keydown.esc')
  onEsc(): void {
    this.close(false);
  }

}
