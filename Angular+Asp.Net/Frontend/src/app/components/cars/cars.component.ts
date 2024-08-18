import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule,HttpClientModule],
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  apiUrl = 'http://localhost:5202/api/User/available-cars';  // URL to fetch car data
  cars: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchCars();
  }

  fetchCars() {
    const token = localStorage.getItem('token'); // Get the token from local storage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any[]>(this.apiUrl, { headers }).subscribe({
      next: (data) => {
        this.cars = data;
        console.log('Cars data:', this.cars); // Debugging line
      },
      error: (err) => {
        console.error('Error fetching car data:', err);
      }
    });
  }

  viewDetails(car: any) {
    this.router.navigate(['/book'], { state: { car: car } });
  }
}
