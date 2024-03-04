import { Component, OnInit } from '@angular/core';
import { CategoryItem } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-category-slider',
  templateUrl: './category-slider.component.html',
  styleUrls: ['./category-slider.component.css']
})
export class CategorySliderComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    navText: ['<i class="fa-solid fa-angle-left"></i>', '<i class="fa-solid fa-angle-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 7
      }
    },
    nav: false
  }

  categoryList: CategoryItem[] = [];

  constructor(private _ProductService: ProductService) { }

  ngOnInit(): void {
    this._ProductService.getAllCategories().subscribe({
      next: response => {
        this.categoryList = response.data
      },
      error: err => {
        console.log(err);

      }
    })
  }
}
