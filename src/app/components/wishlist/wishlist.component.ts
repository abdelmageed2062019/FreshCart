import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/services/wishlist.service';
import { CartService } from 'src/app/services/cart.service';

import { Wishlist } from 'src/app/interfaces/product'

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishList: Wishlist[] = []
  isLoading: boolean = false

  constructor(private _WishlistService: WishlistService, private toastr: ToastrService, private _CartService: CartService) { }


  ngOnInit(): void {
    this.getAllWishlistItems()
  }

  getAllWishlistItems() {
    this.isLoading = true;

    this._WishlistService.getLoggedWishList().subscribe({
      next: response => {
        this.isLoading = false;

        this.wishList = response.data

        console.log(this.wishList);
      },
      error: err => {
        console.log(err);
        this.isLoading = false;

      }
    })
  }

  removeItemFromWishlist(productId: string) {
    this.isLoading = true;

    this._WishlistService.removeProductFromWishList(productId).subscribe({
      next: response => {
        this.isLoading = false;

        this._WishlistService.numOfWishListItems.next(response.data.length)
        this.getAllWishlistItems()
        this.toastr.error(response.message);
        console.log(response);
      },
      error: err => {
        console.log(err);
        this.isLoading = false;

      }

    })
  }

  addWishlistProductToCart(productId: string) {
    this.isLoading = true;

    this._CartService.addProductToCart(productId).subscribe({
      next: response => {
        this.isLoading = false;

        this._WishlistService.numOfWishListItems.next(response.data.length)
        this.toastr.success(response.message);
        console.log(response);
      },
      error: err => {
        console.log(err);
        this.isLoading = false;

      }
    })
  }
}
