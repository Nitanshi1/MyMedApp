import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CarouselComponent } from '../carousel/carousel.component'; 
import { WishlistCartService } from '../../services/wishlist-cart.service';
import { ShoppingcartService } from '../../services/shoppingcart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor,CommonModule,ProductCardComponent,CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
customerService = inject(CustomerService);
newProducts: Product[] = [];
featuredProducts: Product[]=[];
item: any;

wishlistService = inject(WishlistCartService)
shoppingCartService = inject(ShoppingcartService);
ngOnInit(){

  this.customerService.getFeaturedProducts().subscribe((result)=>{
    this.featuredProducts= result;
    console.log(this.featuredProducts);
  });

  this.customerService.getNewProducts().subscribe((result)=>{
    this.newProducts = result;
    console.log(this.newProducts);
  });

}
trackByFn(index: number, item: any): number {
  return item.id; // Use a unique identifier such as id
}



}
