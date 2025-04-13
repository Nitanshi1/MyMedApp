import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/manage/categories/categories.component';
import { CategoryFormComponent } from './components/manage/category-form/category-form.component';
import { BrandsComponent } from './components/manage/brands/brands.component';
import { BrandFormComponent } from './components/manage/brand-form/brand-form.component';
import { ProductComponent } from './components/manage/product/product.component';
import { ProductFormComponent } from './components/manage/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './core/auth-guard';
import { AdminDashboardComponent } from './components/manage/admin-dashboard/admin-dashboard.component';
import { adminGuard } from './core/admin-guard';
import { CustomerProfileComponent } from './components/manage/customer-profile/customer-profile.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { CustomerOrdersComponent } from './components/customer-orders/customer-orders.component';
import { OrdersComponent } from './components/orders/orders.component';


export const routes: Routes = [
    {
        path:"",component:HomeComponent,
        canActivate:[authGuard]
    },
    {
        path:"admin",
        component:AdminDashboardComponent,
         canActivate:[adminGuard]
    },
    {
        path:"admin/categories",
        component:CategoriesComponent,
         canActivate:[adminGuard]
    },
    {
        path:"admin/categories/add",
        component:CategoryFormComponent,
         canActivate:[adminGuard]
    },
    {
        path:"admin/categories/:id",
        component:CategoryFormComponent,
        canActivate:[adminGuard]
    },
    {
        path:"admin/brands",
        component:BrandsComponent,
        canActivate:[adminGuard]
    },
    {
        path:"admin/brands/add",
        component:BrandFormComponent,
         canActivate:[adminGuard]
    },
    {
        path:"admin/brands/:id",
        component:BrandFormComponent,
         canActivate:[adminGuard]
    },
    {
        path:"admin/products",
        component:ProductComponent,
        canActivate:[adminGuard]
    },
    {
        path:"admin/products/add",
        component:ProductFormComponent,
         canActivate:[adminGuard]
    },
    {
        path:"admin/products/:id",
        component:ProductFormComponent,
        canActivate:[adminGuard]
    },

    {
        path:"admin/orders",
        component:OrdersComponent,
        canActivate:[adminGuard]
    },
  
    {
        path:"products",
        component:ProductListComponent,
         canActivate:[authGuard]

    },
    {
        path:"allproducts",
        component:AllProductsComponent,
         canActivate:[authGuard]

    },
    {
        path:"product/:id",
        component:ProductDetailComponent,
         canActivate:[authGuard]
    },

    {
        path:"profile",
        component:CustomerProfileComponent,
         canActivate:[authGuard]
    },
    {
        path:"wishlists",
        component:WishlistComponent,
         canActivate:[authGuard]
    },
    {
        path:"cart",
        component:ShoppingcartComponent,
         canActivate:[authGuard]
    },
    {
        path:"orders",
        component:CustomerOrdersComponent,
         canActivate:[authGuard]
    },
    {
        path:"register",
        component:RegisterComponent  ,
    },
    {
        path:"login",
        component:LoginComponent  ,
    },
];
