import { Component, HostListener, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-shared-view-json-dialog',
  templateUrl: './view-json-dialog.component.html',
  styleUrls: ['./view-json-dialog.component.scss'],
})
export class ViewJsonDialogComponent  {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private mdDialogRef: MatDialogRef<ViewJsonDialogComponent>
  ) {}

  

  close(value: any = false): void {
    this.mdDialogRef.close(value);
  }

  @HostListener('keydown.esc')
  onEsc(): void {
    this.close(false);
  }
}
