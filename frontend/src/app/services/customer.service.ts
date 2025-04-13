import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Product } from '../types/product';
import { Category } from '../types/category';
import { Brand } from '../types/brand';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  http = inject(HttpClient);
  constructor() {}
  getNewProducts() {
    return this.http.get<Product[]>(
      environment.apiUrl + '/customer/new-products/'
    );
  }

  getFeaturedProducts() {
    return this.http.get<Product[]>(
      environment.apiUrl + '/customer/featured-products/'
    );
  }

  getCategories() {
    return this.http.get<Category[]>(
      environment.apiUrl + '/customer/categories'
    );
  }

  getBrands() {
    return this.http.get<Brand[]>(
      environment.apiUrl + '/customer/brands'
    );
  }
  getProducts(
    searchTerm: string,
    categoryId: string,
    brandId: string,
    sortBy: string,
    sortOrder: number,
    page: number,
    pageSize: number
  ) {
    // Create an array of query parameters, filtering out blank or null ones
    const queryParams = [
      searchTerm ? `searchTerm=${searchTerm}` : null,
      categoryId ? `categoryId=${categoryId}` : null,
      brandId ? `brandId=${brandId}` : null,
      sortBy ? `sortBy=${sortBy}` : null,
      sortOrder !== null && sortOrder !== undefined ? `sortOrder=${sortOrder}` : null,
      page ? `page=${page}` : null,
      pageSize ? `pageSize=${pageSize}` : null
    ]
      .filter(param => param !== null) // Filter out null values
      .join('&'); // Join remaining parameters with '&'
  
    // Make the HTTP GET request with the constructed query string
    return this.http.get<Product[]>(
      `${environment.apiUrl}/customer/products?${queryParams}`
    );
  }
  

  getProductsById(id:string){
    return this.http.get<Product>(environment.apiUrl+"/customer/product/"+id);
  }

}
