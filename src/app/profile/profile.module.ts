import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileIndexComponent } from './components/profile-index/profile-index.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProfileIndexComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
