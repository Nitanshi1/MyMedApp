import { Component, inject, OnInit } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product'; 
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Category } from '../../types/category';
import { Brand } from '../../types/brand';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, NgFor,FormsModule, CommonModule, NgIf,FormsModule,MatSelectModule,MatFormFieldModule,MatButtonModule,],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'] 
})
export class ProductListComponent  {
[x: string]: any;
  
  customerService = inject(CustomerService);
  route=inject(ActivatedRoute);
  searchTerm: string = '';
  categoryId: string = '';
  brandId: string = '';
  sortBy: string = 'price';
  sortOrder: number = -1;

  page: number = 1;
  pageSize: number = 6;

  products: Product[] = [];
  category:Category[]=[];
  brands:Brand[]=[];
  ngOnInit() {
    this.customerService.getCategories().subscribe(result=>{
      this.category=result;
    })
    this.customerService.getBrands().subscribe(result=>{
      this.brands=result;
    })
    this.route.queryParams.subscribe((x:any)=>{
    this.searchTerm=x.search ||'';
    this.categoryId=x.categoryId ||'';
    this.getProducts()
    
    })
  }

  getProducts() {
   setTimeout(()=>{
    this.customerService
    .getProducts(
      this.searchTerm,
      this.categoryId,
      this.brandId,
      this.sortBy,
      this.sortOrder,
      this.page,
      this.pageSize
    )
    .subscribe({
      next: (result: any) => { 
        this.products = result.products;
        console.log(result.products)
          if(result.length<this.pageSize){
            this.isNext=false;
          }
      },
      error: (err) => {
        console.error('Error loading products:', err);
      }
    });

  },500);
}
orderChange(event:any){
this.sortBy='price',
this.sortOrder=event;
this.getProducts();
}
isNext=true;
pageChange(page:number){
  this.page=page;
  this.isNext=true;
  this.getProducts();
}
}

