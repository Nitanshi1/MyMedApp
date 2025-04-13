import { Component, inject } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { DatePipe, NgFor } from '@angular/common';
import { Order } from '../../types/order';
import { Product } from '../../types/product';
import { MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [DatePipe,NgFor,MatButtonToggleModule,FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
orderService = inject(OrderService);
orders: Order[]=[];

ngOnInit(){
  this.orderService.getAdminOrder().subscribe((result)=>{
    this.orders=result;
    console.log(result);
    
  })
}

  SellingPrice(product: Product) {
    return Math.round(product.price - (product.price * product.discount) / 100);
  }
  getOrderTotal(items: any[]) {
    return items.reduce(
      (total, item) => total + this.SellingPrice(item.product) * item.quantity,
      0
    );
  }
//   statusChanged(button:any,order:Order){
// console.log(button.value);
// this.orderService.updateOrderStatus(order._id!,button.status).subscribe((result)=>{
//   alert("Order Status Updated!")
// })

//   }

  updateOrderStatus(order: any) {
  
    console.log(`Order ${order._id} status updated to: ${order.status}`);
    this.orderService.updateOrderStatus(order._id!,order.status).subscribe((result)=>{
        alert("Order Status Updated!");
  })
}
}
