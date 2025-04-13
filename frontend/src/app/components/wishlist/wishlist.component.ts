import { Component, inject } from '@angular/core';
import { WishlistCartService } from '../../services/wishlist-cart.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../../types/product';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  wishlists: Product[]=[];
  
wishlistService = inject(WishlistCartService);
ngOnInit(){
  this.wishlistService.init();
}

}
