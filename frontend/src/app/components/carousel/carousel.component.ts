import { CommonModule, NgFor, NgStyle } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [NgFor,CommonModule,NgStyle],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  currentSlide = 0;
  slideWidth = 0;
  carouselImages = [
    'assets/medicalshop.jpeg',
 
    'assets/meds3.jpg',
    'assets/meds4.jpg',
    'assets/health.jpg',
    'assets/tabs.jpeg',
  
  ];
  intervalId: any;

  ngOnInit(): void {
    this.slideWidth = document.querySelector('.carousel-container')?.clientWidth || 0;

    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 3000); // Slide every 3 seconds
  }


  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.carouselImages.length;
  }

  setSlide(index: number): void {
    this.currentSlide = index;
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.slideWidth = (event.target as Window).innerWidth;
  }
}