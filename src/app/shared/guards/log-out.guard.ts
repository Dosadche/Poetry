import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LogOutDialogComponent } from '../components/log-out-dialog/log-out-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class LogOutGuard implements CanDeactivate<unknown> {
  constructor(private dialog: MatDialog){}

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.dialog.open(LogOutDialogComponent, {width: '341px'}).afterClosed()
  }
}
