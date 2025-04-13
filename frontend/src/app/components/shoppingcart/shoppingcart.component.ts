import { Component, inject } from '@angular/core';
import { ShoppingcartService } from '../../services/shoppingcart.service';
import { NgFor } from '@angular/common';
import { Product } from '../../types/product';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { OrderService } from '../../services/order.service';
import { Order } from '../../types/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shoppingcart',
  standalone: true,
  imports: [
    NgFor,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    FormsModule,
  ],
  templateUrl: './shoppingcart.component.html',
  styleUrl: './shoppingcart.component.css',
})
export class ShoppingcartComponent {
  orderService = inject(OrderService);
  shoppingCartService = inject(ShoppingcartService);
  router=inject(Router);
  orderForm!: FormGroup;
  fb = inject(FormBuilder);
  paymentType = 'cash';
  ngOnInit() {
    this.shoppingCartService.init();
    this.orderForm = this.fb.group({
      address1: [],
      address2: [],
      city: [],
      state: [],
      pincode: [],
    });
  }
  get cartItems() {
    return this.shoppingCartService.items;
  }
  SellingPrice(product: Product) {
    return Math.round(product.price - (product.price * product.discount) / 100);
  }

  updateQuantity(productId: string, quantity: number) {
    this.shoppingCartService
      .addToCart(productId, quantity)
      .subscribe((result) => {
        this.shoppingCartService.init();
      });
  }

  get totalAmount() {
    let amount = 0;
    for (let index = 0; index < this.cartItems.length; index++) {
      const element = this.cartItems[index];
      amount += this.SellingPrice(element.product) * element.quantity;
    }
    return amount;
  }
  // get totalDiscount() {
  //   let discount = 0;
  //   for (let item of this.cartItems) {
  //     discount += Math.round((item.product.price * item.product.discount / 100) * item.quantity);
  //   }
  //   return discount;
  // }

  removeItem(productId: string) {
    this.shoppingCartService.removeFromCart(productId).subscribe(() => {
      this.shoppingCartService.init();
    });
  }

  // moveToWishlist(productId: string) {
  //   this.shoppingCartService.(productId).subscribe(() => {
  //     this.shoppingCartService.init();
  //   });
  // }

  orderStep: number = 0;
  checkout() {
    this.orderStep = 1;
  }

  addAddress() {
    this.orderStep = 2;
  }
  finalOrder() {
    let order: Order = {
      items: this.cartItems,

      paymentType: this.paymentType,
      orderAddress: this.orderForm.value,
      date: new Date(),
      totalAmount: this.totalAmount,
    };
    this.orderService.addOrder(order).subscribe((result) => {
      alert('Your order is completed!');
      this.shoppingCartService.init();
      this.orderStep = 0;
      this.router.navigateByUrl("/orders");
    });
    console.log(order);
  }
}
