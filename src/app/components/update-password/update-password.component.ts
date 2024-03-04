import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {
  isLoading: boolean = false
  apiError: string = ""

  updatePasswordForm: FormGroup = new FormGroup({
    currentPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
    rePassword: new FormControl(null, [Validators.required]),
  }, { validators: this.checkRepasswordMatch })

  constructor(private _UserDataService: UserDataService) { }


  updatePassword(dataForm: FormGroup) {
    this.isLoading = true

    if (dataForm.valid) {
      this._UserDataService.updatePassword(dataForm.value).subscribe({
        next: (response) => {

          console.log(response);
          if (response.message === 'success') {
            this.isLoading = false
          }
        },

        error: (err) => {
          console.log(err.error.message);
          this.isLoading = false
          this.apiError = err.error.message
        }

      })
    }
  }

  checkRepasswordMatch(form: any) {
    if (form.get('password')?.value === form.get('rePassword')?.value) {
      return null
    } else {
      form.get('rePassword')?.setErrors({
        rePasswordMatch: 'rePasswrod not match password'
      })
      return {
        rePasswordMatch: 'rePasswrod not match password'
      }
    }
  }

}
