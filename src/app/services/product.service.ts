import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl: string = "https://ecommerce.routemisr.com"

  constructor(private _HttpClient: HttpClient) { }

  getAllProducts(page: number, limit: number): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/products?page=${page}&limit=${limit}`)
  }

  getAllCategories(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/categories`)
  }

  getAllBrands(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/brands`)
  }

  getProductDetails(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/products/${id}`)
  }

  getAllSubCategoriesOnCategory(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/categories/${id}/subcategories`)
  }

}
