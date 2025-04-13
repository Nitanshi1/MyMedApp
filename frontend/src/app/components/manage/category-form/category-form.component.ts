import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoriesComponent } from '../categories/categories.component';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatLabel,
    MatSelectModule
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css',
})
export class CategoryFormComponent {
  name!: string;
  categoryService = inject(CategoryService);
  router = inject(Router);
  route= inject(ActivatedRoute);
  isEdit=false;
  id!:string;
  ngOnInit() {
   this.id = this.route.snapshot.params["id"];

   if(this.id){
    this.isEdit=true;
    this.categoryService.getCategoryById(this.id).subscribe((result:any)=>{
      console.log(result);
      this.name=result.name;
    });
    
  }
}
  add() {
    console.log(this.name);
    this.categoryService.addCategory(this.name).subscribe((result: any) => {
      alert('Category added');
      this.router.navigateByUrl('/admin/categories');
    });
  }
  update(){
    console.log(this.name);
    this.categoryService.updateCategory(this.id,this.name).subscribe((result: any) => {
      alert('Category updated');
      this.router.navigateByUrl('/admin/categories');
    });
  }
}
