import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgetPasswordService } from 'src/app/services/forget-password.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  isLoading: boolean = false
  apiError: string = ""
  resetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/),
    ]),
  });

  constructor(private _ForgetPasswordService: ForgetPasswordService, private _Router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("userToken")) {
      this._Router.navigate(['/home']);
    }
  }

  submitResetForm(dataForm: FormGroup) {
    if (dataForm.valid) {
      this._ForgetPasswordService.resetPassword(dataForm.value).subscribe({
        next: (response) => {
          console.log(response);

          this.isLoading = false;

        },

        error: (err) => {
          console.log(err.error.message);
          this.isLoading = false;
          this.apiError = err.error.message;
        },
      })

    }
  }

}
