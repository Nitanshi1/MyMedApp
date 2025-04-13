import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment';
import { LowerCasePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class WishlistCartService {
  constructor() {}
  wishlists: Product[] = [];
  http = inject(HttpClient);

  init() {
   return  this.getWishLists().subscribe((result) => {
      this.wishlists = result;
    });
  }
  getWishLists() {
    return this.http.get<Product[]>(environment.apiUrl + '/customer/wishlists');

  }

  addInWishList(productId: string) {
    return this.http.post(environment.apiUrl + '/customer/wishlists/' + productId,{});
  }

  removeFromWishLists(productId: string) {
    return this.http.delete(environment.apiUrl + '/customer/wishlists/' + productId);
  }
}
