import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, RouterLink],
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {
  booking: any = {};
  fare: number = 0;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    const bookingId = localStorage.getItem('bookingId');
    if (bookingId) {
      this.getBookingDetails(parseInt(bookingId, 10)); // Convert to int
      this.getFare(parseInt(bookingId, 10)); // Convert to int
    }
  }

  getBookingDetails(id: number) {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Set authorization header

    this.http.get(`http://localhost:5202/api/User/bills/${id}`, { headers }).subscribe((data: any) => {
      this.booking = data;
    });
  }

  getFare(id: number) {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Set authorization header

    this.http.get(`http://localhost:5202/api/User/bills/${id}`, { headers }).subscribe((data: any) => {
      this.fare = data.fare;
    });
  }

  payNow() {
    this.router.navigate(['/payment', { id: this.booking.id, method: 'now' }]);
  }

  payLater() {
    this.router.navigate(['/home']);
  }
}
