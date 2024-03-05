import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl: string = "https://ecommerce.routemisr.com"
  headers = {
    token: localStorage.getItem("userToken") || ""
  }

  numOfCartItems: BehaviorSubject<number> = new BehaviorSubject(0)

  constructor(private _HttpClient: HttpClient) { }

  private updateCartItemsCount(count: number) {
    this.numOfCartItems.next(count);
  }

  addProductToCart(productId: string): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/cart`,
      { productId: productId },
      { headers: this.headers }
    ).pipe(
      tap(() => this.updateCartItemsCount(this.numOfCartItems.value + 1))
    )
  }

  getLoggedCart(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/cart`,
      { headers: this.headers }
    )
  }

  removeProductFromCart(productId: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart/${productId}`,
      { headers: this.headers }
    ).pipe(
      tap(() => this.updateCartItemsCount(this.numOfCartItems.value - 1))
    )
  }

  updateProduct(productId: string, count: number): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}/api/v1/cart/${productId}`,
      { count: count },
      { headers: this.headers }
    )
  }

  clearCart() {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart`,
      { headers: this.headers }
    ).pipe(
      tap(() => this.updateCartItemsCount(0))
    )
  }

}
