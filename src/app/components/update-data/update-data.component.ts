import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.css']
})
export class UpdateDataComponent {
  isLoading: boolean = false
  apiError: string = ""

  newDataForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  })

  constructor(private _UserDataService: UserDataService) { }

  updateData(dataForm: FormGroup) {
    this.isLoading = true

    if (dataForm.valid) {
      this._UserDataService.updateUserData(dataForm.value).subscribe({
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

}
