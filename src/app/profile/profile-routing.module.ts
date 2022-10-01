import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileIndexComponent } from './components/profile-index/profile-index.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileIndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
