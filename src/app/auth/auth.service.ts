import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { from, Observable, switchMap, take, tap } from 'rxjs';
import { User } from '../models/user.model';
import { UsersService } from '../shared/services/crud/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private usersService: UsersService,
              private auth: Auth,
              private router: Router) { }

  handleRegister(user: User): Observable<User> {
    return from(createUserWithEmailAndPassword(this.auth, user.email, user.password))
    .pipe(
      switchMap(() => this.usersService.create(user)),
      switchMap(() => this.usersService.getByField('email', user.email, true)),
      tap((createdUser: User) => this.navigateToProfile(createdUser)))
  }

  handleLogin(email: string, password: string): void {
    signInWithEmailAndPassword(this.auth, email, password)
    .then(() => this.getUserAfterLogin(email))
  }

  private getUserAfterLogin(email: string): void {
    this.usersService.getByField('email', email, true)
    .pipe(take(1))
    .subscribe((user: User) => this.navigateToProfile(user))
  }

  private navigateToProfile(user: User): void {
    localStorage.setItem('user', JSON.stringify(user))
    this.router.navigate(['/profile'])
  }
}
