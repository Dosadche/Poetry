import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private authService: AuthService) { }

  ngOnInit(): void {}

  public onSubmit(){
    const newUser = new User(this.signUpForm.value)
    this.authService.handleRegister(newUser)
  }

}
