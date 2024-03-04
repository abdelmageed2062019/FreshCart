import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Brand } from 'src/app/interfaces/product';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent {
  brandList: Brand[] = [];
  isLoading: boolean = true

  constructor(private _ProductService: ProductService) { }
  ngOnInit(): void {
    this.getAllCategories()
  }

  getAllCategories() {
    this._ProductService.getAllBrands().subscribe({
      next: response => {

        this.brandList = response.data
        this.isLoading = false
        console.log(this.brandList);
      },

      error: err => {
        console.log(err);
        this.isLoading = false

      }
    })
  }
}
