import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/services/wishlist.service';
import { Wishlist } from 'src/app/interfaces/product'


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {
  isLoading: boolean = true

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }
  productId: string = ""
  productItem: any
  wishList: Wishlist[] = []

  constructor(private _ProductsServices: ProductService, private toastr: ToastrService, private _CartService: CartService, private _ActivatedRoute: ActivatedRoute, private _WishlistService: WishlistService) { }

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe(param => {
      this.productId = param['id']
      console.log(this.productId)
    })
    this._ProductsServices.getProductDetails(this.productId).subscribe({
      next: response => {
        this.isLoading = false

        this.productItem = response.data
        console.log(this.productItem);

      },
      error: err => {
        this.isLoading = false

        console.log(err);

      }
    })
  }

  addProductToCart(productId: string) {
    this.isLoading = true
    this._CartService.addProductToCart(productId).subscribe({
      next: response => {
        console.log(response);
        this._CartService.numOfCartItems.next(response.numOfCartItems)
        this.toastr.success(response.message);
        this.isLoading = false

      },

      error: err => {
        console.log(err);
        this.isLoading = false

      }
    })
  }

  getAllWishlistItem() {
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

  isProductInWishlist(productId: string): boolean {
    return this.wishList.some(item => item._id === productId);
  }

  toggleWithListBtn(productId: string) {
    this.isLoading = true

    if (this.isProductInWishlist(productId)) {
      this._WishlistService.removeProductFromWishList(productId).subscribe({
        next: response => {
          this.getAllWishlistItem()
          console.log(response);
          this._WishlistService.numOfWishListItems.next(response.data.length)
          this.getAllWishlistItem()
          this.toastr.error(response.message);
          this.isLoading = false
        }, error: err => {
          console.log(err);
          this.isLoading = false

        }
      })
    } else {
      this._WishlistService.addProductToWishList(productId).subscribe({

        next: response => {
          this._WishlistService.numOfWishListItems.next(response.data.length)
          this.toastr.success(response.message);
          this.getAllWishlistItem()

          this.isLoading = false


        }, error: err => {
          console.log(err);
          this.isLoading = false

        }
      })
    }
  }
}
