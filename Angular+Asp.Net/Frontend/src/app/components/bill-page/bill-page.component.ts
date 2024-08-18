import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-bill-page',
  standalone: true,
  imports: [RouterLink, HttpClientModule, CommonModule],
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.css']
})
export class BillPageComponent implements OnInit {
  apiUrl = 'http://localhost:5202/api/User/bills'; // Base URL to fetch bill details
  billDetails: any = {};

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchBillDetails();
  }

  fetchBillDetails(): void {
    // Retrieve the booking ID from local storage
    const bookingId = localStorage.getItem('bookingId');
    
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');
    
    // Check if bookingId and token are available
    if (bookingId && token) {
      // Set the headers with the token
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      // Make the GET request to fetch the bill details
      this.http.get<any>(`${this.apiUrl}/${bookingId}`, { headers }).subscribe({
        next: (data) => {
          this.billDetails = data;
        },
        error: (err) => {
          console.error('Error fetching bill details:', err);
        }
      });
    } else {
      console.error('Booking ID or Token is missing.');
    }
  }
}
