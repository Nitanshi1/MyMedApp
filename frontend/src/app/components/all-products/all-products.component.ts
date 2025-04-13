import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { NgFor, NgIf } from '@angular/common';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [ProductCardComponent,NgFor,NgIf,],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent {
  products!:Product[]
  productService=inject(ProductService)
  ngOnInit(){
    this.getallproducts();
  }
  getallproducts(){
      this.productService.getAllProducts().subscribe((p)=>{
        console.log(p);
        this.products=p
      })
  }

  
}
