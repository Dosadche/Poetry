import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index/index.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    IndexComponent,
    CreatePostComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class FeedModule { }
