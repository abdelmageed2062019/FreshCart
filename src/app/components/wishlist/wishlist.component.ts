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
  constructor(private _WishlistService: WishlistService, private toastr: ToastrService, private _CartService: CartService) { }


  ngOnInit(): void {
    this.getAllWishlistItems()
  }

  getAllWishlistItems() {
    this._WishlistService.getLoggedWishList().subscribe({
      next: response => {

        this.wishList = response.data

        console.log(this.wishList);
      },
      error: err => {
        console.log(err);

      }
    })
  }

  removeItemFromWishlist(productId: string) {
    this._WishlistService.removeProductFromWishList(productId).subscribe({
      next: response => {
        this.getAllWishlistItems()
        this.toastr.error(response.message);

        console.log(response);
      },
      error: err => {
        console.log(err);

      }

    })
  }

  addWishlistProductToCart(productId: string) {
    this._CartService.addProductToCart(productId).subscribe({
      next: response => {
        this.toastr.success(response.message);

        console.log(response);
      },
      error: err => {
        console.log(err);

      }
    })
  }
}
