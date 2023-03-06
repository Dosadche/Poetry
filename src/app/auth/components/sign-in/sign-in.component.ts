import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { finalize, takeUntil } from 'rxjs';
import { UnsubscriberComponent } from 'src/app/shared/components/unsubscriber/unsubscriber.component';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent extends UnsubscriberComponent implements OnInit {
  isLoading = false;
  signInForm = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', Validators.required)
  })

  constructor(private authService: AuthService) {
    super();
  }

  ngOnInit(): void {
    localStorage.removeItem('user')
  }

  public onSubmit() {
    this.isLoading = true
    this.authService.handleLogin(this.signInForm.value.email, this.signInForm.value.password)
    .pipe(
      takeUntil(this.$destroy), 
      finalize(() => this.isLoading = false))
    .subscribe()
  }
}
