import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, inject, Input, TrackByFunction } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { MatIconModule } from '@angular/material/icon';
import { WishlistCartService } from '../../services/wishlist-cart.service';
import { ShoppingcartService } from '../../services/shoppingcart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule, MatIconModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  similarProducts!: Product[];
  wishlistService = inject(WishlistCartService);
  customerService = inject(CustomerService);
  router = inject(ActivatedRoute);
  shoppingCartService = inject(ShoppingcartService);

  product!: Product;
  selectedImage!: string;
  submitReview() {
    throw new Error('Method not implemented.');
  }
  ngOnInit() {
    this.router.params.subscribe((x: any) => {
      this.getProductDetail(x.id);
    });
  }

  getProductDetail(id: string) {
    this.customerService.getProductsById(id).subscribe((result) => {
      this.product = result;
      this.selectedImage = this.product.images[0];
      console.log(this.product);
      this.customerService
        .getProducts('', this.product.categoryId, '', '', -1, 1, 4)
        .subscribe((result) => {
          this.similarProducts = result;
        });
    });
  }

  selectImage(image: string) {
    this.selectedImage = image;
  }

  addToWishList(product: Product) {
    console.log(product);
    if (this.isInWishList(product)) {
      this.wishlistService
        .removeFromWishLists(product._id!)
        .subscribe((res) => {
          this.wishlistService.init();
        });
    } else {
      this.wishlistService.addInWishList(product._id!).subscribe((res) => {
        this.wishlistService.init();
      });
    }
  }

  isInWishList(product: Product) {
    let productExists = this.wishlistService.wishlists.find(
      (x) => x._id == product._id
    );

    if (productExists) return true;
    else return false;
  }
  get SellingPrice() {
    return Math.round(
      this.product.price - (this.product.price * this.product.discount) / 100
    );
  }
  trackByFn(index: number, item: any): number {
    return item.id; // Use a unique identifier such as id
  }

  isProductInCart(productId: string) {
    if (
      this.shoppingCartService.items.find((x) => x.product._id === productId)
    ) {
      return true;
    } else {
      return false;
    }
  }
  addToCart(product: Product) {
    console.log(product);
    if (!this.isProductInCart(product._id!)) {
      this.shoppingCartService.addToCart(product._id!, 1).subscribe(() => {
        this.shoppingCartService.init();
      });
    } else {
      this.shoppingCartService.removeFromCart(product._id!);
    }
  }
}
