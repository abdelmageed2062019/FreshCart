import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CategoryItem, SubCategory } from 'src/app/interfaces/product';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoryList: CategoryItem[] = [];
  isLoading: boolean = true
  subCateList: SubCategory[] = []
  isSubLoading: boolean = true

  constructor(private _ProductService: ProductService) { }

  ngOnInit(): void {
    this.getAllCategories()
  }

  getAllCategories() {
    this._ProductService.getAllCategories().subscribe({
      next: response => {

        this.categoryList = response.data
        this.isLoading = false
        console.log(this.categoryList);
      },

      error: err => {
        console.log(err);
        this.isLoading = false

      }
    })
  }

  openModal(categoryId: string) {
    this.subCateList = []
    this.isSubLoading = true

    this._ProductService.getAllSubCategoriesOnCategory(categoryId).subscribe({
      next: response => {
        this.subCateList = response.data
        this.isSubLoading = false
      },

      error: err => {
        console.log(err);
        this.isSubLoading = false
      }
    })
  }
}
