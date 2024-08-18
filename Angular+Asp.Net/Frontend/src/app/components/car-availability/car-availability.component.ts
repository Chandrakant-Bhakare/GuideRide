import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-availability',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  templateUrl: './car-availability.component.html',
  styleUrls: ['./car-availability.component.css']
})
export class CarAvailabilityComponent implements OnInit {
  apiUrl = 'http://localhost:5202/api/User/available-cars'; // URL to fetch car data
  cars: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchCars();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  fetchCars(): void {
    this.http.get<any[]>(this.apiUrl, { headers: this.getAuthHeaders() }).subscribe({
      next: (data) => {
        this.cars = data;
      },
      error: (err) => {
        console.error('Error fetching car data:', err);
      }
    });
  }

  bookCar(car: any): void {
    // Implement booking logic here, e.g., navigate to a booking page or show a form
    console.log('Booking car:', car);
  }
}
