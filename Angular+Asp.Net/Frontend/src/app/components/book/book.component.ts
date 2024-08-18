import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink, FormsModule],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  booking = {
    startDate: '',
    endDate: '',
    bording: '',
    destination: '',
    carId: '',
    guideId: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  validateDates() {
    const currentDate = new Date();
    const startDate = new Date(this.booking.startDate);
    const endDate = new Date(this.booking.endDate);

    if (startDate < currentDate) {
      alert('Start date must be today or later.');
      this.booking.startDate = '';
    }

    if (endDate <= startDate) {
      alert('End date must be greater than the start date.');
      this.booking.endDate = '';
    }
  }

  validateForm(form: NgForm) {
    if (!form.valid) {
      alert('Please fill out all required fields.');
      return false;
    }

    if (!this.booking.startDate || !this.booking.endDate) {
      alert('Please provide valid start and end dates.');
      return false;
    }

    const startDate = new Date(this.booking.startDate);
    const endDate = new Date(this.booking.endDate);

    if (endDate <= startDate) {
      alert('End date must be greater than the start date.');
      return false;
    }

    return true;
  }

  onSubmit(form: NgForm) {
    if (this.validateForm(form)) {
      const token = localStorage.getItem('token'); // Retrieve token from local storage

      if (token) {
        console.log(this.booking);
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const apiUrl = 'http://localhost:5202/api/User/bookings';

        this.http.post(apiUrl, this.booking, { headers }).subscribe({
          next: (response: any) => {
            console.log('Booking successful', response);

            // Assuming the response contains the booking ID
            if (response && response.id) {
              localStorage.setItem('bookingId', response.id); // Store booking ID in local storage
            }

            this.router.navigate(['/bill']); // Navigate to confirmation page
            alert('Ride booked successfully!');
          },
          error: (error) => {
            console.error('Error during booking', error);
          }
        });
      } else {
        alert('User is not authenticated.');
      }
    }
  }
}
