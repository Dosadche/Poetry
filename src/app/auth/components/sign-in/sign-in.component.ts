import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    localStorage.removeItem('user')
  }

  public onSubmit() {
    this.authService.handleLogin(this.signInForm.value.email, this.signInForm.value.password)
  }
}
