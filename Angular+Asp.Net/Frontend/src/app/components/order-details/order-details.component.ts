import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule ,Router} from '@angular/router';

import { BillPageComponent } from '../bill-page/bill-page.component';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule,RouterLink,BillPageComponent,RouterModule,RouterLink],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})

export class OrderDetailsComponent implements OnInit {
  
  bookingDetailsUrl = 'http://localhost:5202/api/User/bookings';  // URL to fetch all booking details
  bookingDetails: any[] = [];

  
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchAllBookingDetails();
  }

  fetchAllBookingDetails(): void {
    const token = localStorage.getItem('token');  // Retrieve the token from local storage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any[]>(this.bookingDetailsUrl, { headers }).subscribe({
      next: (data) => {
        this.bookingDetails = data;
        console.log('Received booking details:', data); // Debugging line
      },
      error: (err) => {
        console.error('Error fetching booking details:', err);
      }
    });
  }
  storeBookingIdAndNavigate(bookingId: number): void {
    localStorage.setItem('bookingId', bookingId.toString()); // Store the bookingId in local storage
    console.log('Stored Booking ID:', bookingId); // Debugging line to verify
    this.router.navigate(['/bill']); // Navigate to the Bill Page
  }
}
