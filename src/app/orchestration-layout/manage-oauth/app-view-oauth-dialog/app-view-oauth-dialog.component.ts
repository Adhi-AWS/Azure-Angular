import { Component, HostListener, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-app-view-oauth-dialog',
  templateUrl: './app-view-oauth-dialog.component.html',
  styleUrls: ['./app-view-oauth-dialog.component.scss']
})
export class AppViewOauthDialogComponent  {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private mdDialogRef: MatDialogRef<AppViewOauthDialogComponent>
  ) { }

  

  close(value: any = false): void {
    this.mdDialogRef.close(value);
  }

  @HostListener('keydown.esc')
  onEsc(): void {
    this.close(false);
  }

}
