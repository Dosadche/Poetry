import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileIndexComponent } from './components/profile-index/profile-index.component';
import { SharedModule } from '../shared/shared.module';
import { MyPostsListComponent } from './components/my-posts-list/my-posts-list.component';
import { UploadPhotoComponent } from '../shared/components/upload-photo/upload-photo.component';


@NgModule({
  declarations: [
    ProfileIndexComponent,
    MyPostsListComponent,
    UploadPhotoComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
