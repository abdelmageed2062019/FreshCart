import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  apiError: string = '';
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/),
    ]),
  });

  constructor(private _AuthService: AuthService, private _Router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("userToken")) {
      this._Router.navigate(['/home']);
    }
  }


  submitLogin(dataForm: FormGroup) {
    this.isLoading = true;

    if (dataForm.valid) {
      this._AuthService.signin(dataForm.value).subscribe({

        next: (response) => {

          console.log(response);
          if (response.message === 'success') {
            this._AuthService.decodeUserToken();

            localStorage.setItem('userToken', response.token);

            this._Router.navigate(['/home']);
            this.isLoading = false;
          }
        },

        error: (err) => {
          console.log(err.error.message);
          this.isLoading = false;
          this.apiError = err.error.message;
        },
      });
    }
  }
}
