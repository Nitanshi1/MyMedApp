import { Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../types/category';
import { CategoriesComponent } from '../manage/categories/categories.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomerService } from '../../services/customer.service';
import { FormsModule } from '@angular/forms';

import { AdminDashboardComponent } from '../manage/admin-dashboard/admin-dashboard.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor,CommonModule,RouterLink,NgIf,FormsModule,AdminDashboardComponent,MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
 customerService=inject(CustomerService);
 categoryList:Category[]=[];
  authService = inject(AuthService)
  searchTerm!:string;
 router=inject(Router);
 ngOnInit(){
  this.customerService.getCategories().subscribe(result=>{
    this.categoryList=result;
  })
 }
OnSearch(e:any){
  if(e.target.value)
  {
    this.router.navigateByUrl("/products?search="+e.target.value)
  }
}

searchCategory(id:string){
  this.searchTerm="";
  this.router.navigateByUrl("/products?categoryId="+id!)
}
logout(){
  this.authService.logout();
  this.router.navigateByUrl("/login");
}
navigateToCustomerProfile() {
  this.router.navigate(['/profile']);
}

navigateToAdmin() {
  this.router.navigate(['/admin']);
}

}
