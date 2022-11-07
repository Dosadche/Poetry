import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  isLoading = false
  signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  constructor(private authService: AuthService,
              private _location: Location) { }

  ngOnInit(): void {}

  onSubmit(){
    this.isLoading = true
    const newUser = new User(this.signUpForm.value)
    this.authService.handleRegister(newUser)
  }

  goBack(){
    this._location.back()
  }

}
