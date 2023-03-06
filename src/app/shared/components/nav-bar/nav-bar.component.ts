import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, takeUntil } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UsersService } from '../../services/crud/users.service';
import { UnsubscriberComponent } from '../unsubscriber/unsubscriber.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent extends UnsubscriberComponent implements OnInit, OnDestroy {
  public currentUser: User
  private observable: Subscription

  constructor(private router: Router,
              private usersService: UsersService) {
    super();
  }

  ngOnInit(): void {
    this.initializeUser()
    this.subscribeOnUserChanges()
  }

  ngOnDestroy(): void {
    this.observable.unsubscribe()
  }

  public logOut(): void {
    this.router.navigate(['sign-in'])
  }

  private subscribeOnUserChanges(): void {
    this.observable = this.usersService.userChanges
    .pipe(takeUntil(this.$destroy))
    .subscribe(() => {
      this.initializeUser()
    })
  }

  private initializeUser(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'))
  }
}
