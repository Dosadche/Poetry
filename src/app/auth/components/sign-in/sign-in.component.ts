import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { finalize, take } from 'rxjs';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  isLoading = false;
  signInForm = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', Validators.required)
  })

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    localStorage.removeItem('user')
  }

  public onSubmit() {
    this.isLoading = true
    this.authService.handleLogin(this.signInForm.value.email, this.signInForm.value.password)
    .pipe(take(1), finalize(() => this.isLoading = false)).subscribe()
  }
}
