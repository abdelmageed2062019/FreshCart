import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  baseUrl: string = "https://ecommerce.routemisr.com"
  headers = {
    token: localStorage.getItem("userToken") || ""
  }

  numOfWishListItems: BehaviorSubject<number> = new BehaviorSubject(0)

  constructor(private _HttpClient: HttpClient) { }

  getLoggedWishList(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/wishlist`,
      { headers: this.headers }
    )
  }


  addProductToWishList(productId: string): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/wishlist`,
      { productId: productId },
      { headers: this.headers }
    )
  }



  removeProductFromWishList(productId: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/wishlist/${productId}`,
      { headers: this.headers }
    )
  }
}
