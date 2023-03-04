import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from '../../auth.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  isLoading = false
  signUpForm = new UntypedFormGroup({
    name: new UntypedFormControl('', Validators.required),
    surname: new UntypedFormControl('', Validators.required),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', Validators.required)
  })

  constructor(private authService: AuthService,
              private _location: Location) { }

  ngOnInit(): void {}

  onSubmit(){
    this.isLoading = true
    const newUser = new User(this.signUpForm.value)
    this.authService.handleRegister(newUser) .pipe(take(1)).subscribe()
  }

  goBack(){
    this._location.back()
  }

}
