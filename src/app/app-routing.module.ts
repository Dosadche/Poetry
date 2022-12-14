import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './auth/components/sign-in/sign-in.component';
import { SignUpComponent } from './auth/components/sign-up/sign-up.component';
import { IndexComponent } from './feed/components/index/index.component';
import { SearchComponent } from './search/search.component';
import { SettingsComponent } from './settings/settings.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { IsLoggedGuard } from './shared/guards/is-logged.guard';
import { LogOutGuard } from './shared/guards/log-out.guard';

const routes: Routes = [
  {
    path: '',
    component: NavBarComponent,
    canActivate: [IsLoggedGuard],
    canDeactivate: [LogOutGuard],
    children: [
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then((mod) => mod.ProfileModule)
      },
      {
        path: 'feed',
        component: IndexComponent
      },
      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'profile'
      }
    ]
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
