import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-shipping-adress',
  templateUrl: './shipping-adress.component.html',
  styleUrls: ['./shipping-adress.component.css']
})
export class ShippingAdressComponent {
  cartId = ""
  shippingAddress: FormGroup = new FormGroup({
    details: new FormControl('', Validators.required),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]), city: new FormControl('', Validators.required)
  })

  constructor(private _PaymentService: PaymentService, private _ActivatedRoute: ActivatedRoute) { }

  submitShipping(dataForm: FormGroup) {
    console.log(dataForm);

    if (dataForm.valid) {
      this._ActivatedRoute.params.subscribe(params => {
        console.log(params);
        this.cartId = params['id']
      })

      this._PaymentService.checkOut(this.cartId, dataForm.value).subscribe({
        next: response => {
          if (response.status === 'success') {
            console.log(response);
            window.location.href = response.session.url;
          }
        },
        error: err => {
          console.log(err);

        }
      })
    }

  }
}
