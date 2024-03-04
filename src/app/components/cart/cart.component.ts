import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  productList: any[] = [];
  totalPrice: number = 0;
  numberOfCartItems: number = 0;
  emptyCart: boolean = false;
  cartId: string = "";
  isLoading: boolean = false;

  constructor(private _CartService: CartService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getLoggedUserCart();
  }

  getLoggedUserCart() {
    this.isLoading = true;
    this._CartService.getLoggedCart().subscribe({
      next: response => {
        this.updateCartData(response);
        this.isLoading = false;
      },
      error: err => {
        console.log(err);
        this.emptyCart = true;
        this.isLoading = false;
      }
    });
  }

  updateCartData(response: any) {
    this.numberOfCartItems = response.numOfCartItems;
    this.totalPrice = response.data.totalCartPrice;
    this.productList = response.data.products;
    this.cartId = response.data._id;
  }

  removeProduct(productId: string) {
    this.isLoading = true;
    this._CartService.removeProductFromCart(productId).pipe(
      tap(response => {
        this._CartService.numOfCartItems.next(response.numOfCartItems);
        if (response.numOfCartItems === 0) {
          this.clearCart()
        } else {
          this.getLoggedUserCart();
          this.toastr.error("Product deleted from your cart");
          this.isLoading = false;
        }

      })
    ).subscribe();
  }

  updateProductCart(productId: string, count: number) {
    this.isLoading = true;
    this._CartService.updateProduct(productId, count).pipe(
      tap(response => {
        this._CartService.numOfCartItems.next(response.numOfCartItems);

        if (count === 0) {
          this.removeProduct(productId)
        }

        this.getLoggedUserCart();
        this.isLoading = false;
      })
    ).subscribe();
  }

  clearCart() {
    this.isLoading = true;
    this._CartService.clearCart().pipe(
      tap(response => {
        this._CartService.numOfCartItems.next(0);
        this.updateCartData({ numOfCartItems: 0, data: { totalCartPrice: 0, products: [] } });
        this.toastr.error("All items removed");
        this.emptyCart = true;
        this.isLoading = false;
      })
    ).subscribe();
  }
}
