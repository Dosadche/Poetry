import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UsersService } from '../../services/crud/users.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {
  public currentUser: User
  private observable: Subscription

  constructor(private router: Router,
              private usersService: UsersService) { }

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
    .subscribe(() => {
      this.initializeUser()
    })
  }

  private initializeUser(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'))
  }
}
