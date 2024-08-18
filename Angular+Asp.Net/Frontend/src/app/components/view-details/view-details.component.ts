
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';




export interface Car {
  id: string;
  modelName: string;
  registrationNo: string;
  priceType: string;
  fare: number;
  status: string; 
  image: string;
}

@Component({
  selector: 'app-view-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-details.component.html',
  styleUrl: './view-details.component.css'
})

export class ViewDetailsComponent implements OnInit {
  car: any; // Define the car object

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Fetch car details from route state
    this.route.data.subscribe(data => {
      this.car = data['car'] || {};
    });
  }

  bookNow(): void {
    if (this.car) {
      console.log('Booking car:', this.car);
      // Add your booking logic here
    }
  }
}