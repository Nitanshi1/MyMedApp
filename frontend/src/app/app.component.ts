import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {MatButtonModule} from '@angular/material/button';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/manage/categories/categories.component';
import { CategoryFormComponent } from './components/manage/category-form/category-form.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminDashboardComponent } from './components/manage/admin-dashboard/admin-dashboard.component';
import { WishlistCartService } from './services/wishlist-cart.service';
import { ShoppingcartService } from './services/shoppingcart.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatButtonModule,HeaderComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'medApp';
  wishlistService=inject(WishlistCartService);
  shoppingCartService = inject(ShoppingcartService);
  authService = inject(AuthService);

  ngOnInit(){
    if(this.authService.isLoggedIn){
      this.wishlistService.init();
      this.shoppingCartService.init();
    }
 
  }
}
