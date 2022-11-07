import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(title: string, message: string): Observable<boolean>{
    return this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: title, 
        message: message
      }
    }).afterClosed()
  }
}
