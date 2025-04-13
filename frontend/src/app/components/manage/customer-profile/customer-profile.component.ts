import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [NgFor,NgIf,CommonModule,FormsModule],
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.css'
})
export class CustomerProfileComponent {

    authService = inject(AuthService);
    orderHistory = [];
  
    ngOnInit() {

    }
 
  }
  

