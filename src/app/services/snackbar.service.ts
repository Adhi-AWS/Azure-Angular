import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string, action?: string, config = { duration: 4000 }) {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    this.snackBar.open(message, action, config);
  }
}
