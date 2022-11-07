import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  isLoading = false;
  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    localStorage.removeItem('user')
  }

  public onSubmit() {
    this.authService.handleLogin(this.signInForm.value.email, this.signInForm.value.password)
    this.isLoading = true
  }
}
