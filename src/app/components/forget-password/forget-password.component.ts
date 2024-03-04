import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgetPasswordService } from 'src/app/services/forget-password.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  isLoading: boolean = false
  showCode: boolean = false

  emailForForgetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  })

  resetCodeData: FormGroup = new FormGroup({
    resetCode: new FormControl(""),
  })

  apiError: string = '';

  constructor(private _ForgetPasswordService: ForgetPasswordService, private _Router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("userToken")) {
      this._Router.navigate(['/home']);
    }
  }

  forgetPassword(email: FormGroup) {
    this.isLoading = true;

    if (this.emailForForgetPassword.valid) {
      this._ForgetPasswordService.forgetPassword(email.value).subscribe({
        next: response => {
          console.log(response);
          this.isLoading = false;
          this.showCode = true
          this.apiError = ""
        },
        error: err => {
          console.log(err);
          this.isLoading = false;
          this.apiError = err.error.message;

        }
      })
    }

  }

  applyCode(resetCode: FormGroup) {
    this.isLoading = true;

    this._ForgetPasswordService.resetCode(resetCode.value).subscribe({
      next: response => {
        console.log(response);
        this.isLoading = false;
        this._Router.navigate(['/resetPassword']);

      },
      error: err => {
        console.log(err);
        this.isLoading = false;
        this.apiError = err.error.message;
      }
    })
  }
}
