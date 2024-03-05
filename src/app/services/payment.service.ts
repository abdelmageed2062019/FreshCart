import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  baseUrl: string = "https://ecommerce.routemisr.com"
  headers = {
    token: localStorage.getItem("userToken") || ""
  }
  constructor(private _HttpClient: HttpClient) { }

  checkOut(cartId: string, shippingAddress: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=https://fresh-cart-sooty.vercel.app/`,
      { shippingAddress: shippingAddress },
      { headers: this.headers }
    )
  }

  getUserOrders(userId: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/orders/user/${userId}`
    )
  }

}
