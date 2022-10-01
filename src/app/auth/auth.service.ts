import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { User } from '../models/user.model';
import { UserServiceService } from '../shared/services/crud/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private usersService: UserServiceService,
              private auth: Auth,
              private router: Router) { }

  public handleRegister(user: User){
    createUserWithEmailAndPassword(this.auth, user.email, user.password)
    .then(() => {
      this.usersService.create(user).then(res => console.log('What returns create()',res))
      return user
    })
    .then((user: User) => this.navigateToProfile(user))
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
