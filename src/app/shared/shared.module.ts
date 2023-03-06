import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LogOutDialogComponent } from './components/log-out-dialog/log-out-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PostComponent } from './components/post/post.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { UnsubscriberComponent } from './components/unsubscriber/unsubscriber.component';

@NgModule({
  declarations: [
    NavBarComponent,
    LogOutDialogComponent,
    ConfirmDialogComponent,
    PostComponent,
    PostsListComponent,
    PostsListComponent,
    UnsubscriberComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [MaterialModule, RouterModule, ReactiveFormsModule, PostComponent, PostsListComponent],
  providers: []
})
export class SharedModule { }
