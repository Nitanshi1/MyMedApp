import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment';
import { cartItem } from '../types/cartItem';

@Injectable({
  providedIn: 'root',
})
export class ShoppingcartService {
  constructor() {}
  items: cartItem[] = [];

  http = inject(HttpClient);

  init() {
    return this.getCartItems().subscribe((result) => {
      this.items = result;
    });
  }
  getCartItems() {
    return this.http.get<cartItem[]>(environment.apiUrl + '/customer/carts');
  }

  addToCart(productId: string, quantity: number) {
    return this.http.post(environment.apiUrl + '/customer/carts/' + productId, {
      quantity: quantity,
    });
  }

  removeFromCart(productId: string) {
    return this.http.delete(environment.apiUrl + '/customer/carts/' + productId);
  }
}
