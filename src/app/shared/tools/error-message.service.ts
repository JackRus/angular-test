import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  constructor(private _snackBar: MatSnackBar) { }

  showError(error: string) {
    const mesage = error.length > 200 ? error.slice(0, 200) + '...' : error;
    return this._snackBar.open(mesage, 'Ok', { duration: 5000 }).afterDismissed();
  }
}
