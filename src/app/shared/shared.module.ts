import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { LogOutDialogComponent } from './components/log-out-dialog/log-out-dialog.component';

@NgModule({
  declarations: [
    NavBarComponent,
    LogOutDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [MaterialModule, RouterModule],
  providers: []
})
export class SharedModule { }
