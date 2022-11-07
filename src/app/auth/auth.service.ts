import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { User } from '../models/user.model';
import { UserServiceService } from '../shared/services/crud/user-service.service';
import { DialogService } from '../shared/services/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private usersService: UserServiceService,
              private auth: Auth,
              private router: Router,
              private dialogService: DialogService) { }

  public handleRegister(user: User){
    createUserWithEmailAndPassword(this.auth, user.email, user.password)
    .then(() => {
      this.usersService.create(user)
      return user
    })
    .then((user: User) => this.navigateToProfile(user))
    .catch(() => {
      this.dialogService.openConfirmDialog('Oops :(', 'Looks like something went wrong. Maybe you should try another email.')
    })
  }

  public handleLogin(email: string, password: string){
    signInWithEmailAndPassword(this.auth, email, password)
    .then(() => {
      this.getUserAfterLogin(email)
    })
  }

  private getUserAfterLogin(email: string){
    this.usersService.getByField('email', email, true)
    .subscribe((user: User) => {
      this.navigateToProfile(user)
    })
  }

  private navigateToProfile(user: User){
    localStorage.setItem('user', JSON.stringify(user))
    this.router.navigate(['/profile'])
  }
}
