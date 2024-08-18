import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-guide-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule], // Correct imports
  templateUrl: './guide-update.component.html',
  styleUrls: ['./guide-update.component.css']
})
export class GuideUpdateComponent implements OnInit {

  bookingForm: FormGroup;
  guideId: number;
  apiUrl = 'http://localhost:5202/api/admin/Admin/guides';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router // Inject Router
  ) {
    this.bookingForm = this.fb.group({
      id: [''], // Ensure fields are editable
      name: [''], // Ensure fields are editable
      rating: [''], // Ensure fields are editable
      fare: [''], // Ensure fields are editable
      status: [false, Validators.required] // Keep the status field as required
    });
  }

  ngOnInit(): void {
    // Fetch guideId from local storage
    this.guideId = Number(localStorage.getItem('guideid'));
    if (this.guideId) {
      this.fetchGuideDetails();
    } else {
      console.error('Guide ID is not available in local storage.');
    }
  }

  fetchGuideDetails(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.get<any>(`${this.apiUrl}/${this.guideId}`, { headers }).subscribe(
      data => {
        this.bookingForm.patchValue(data);
      },
      error => {
        console.error('Error fetching guide details', error);
      }
    );
  }

  updateGuideStatus(): void {
    if (this.bookingForm.valid) {
      const updatedData = this.bookingForm.value;
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      });

      this.http.put<any>(`${this.apiUrl}/${this.guideId}`, updatedData, { headers }).subscribe(
        response => {
          this.router.navigate(['/guide-management']);
         alert('Guide status updated successfully');
          // Navigate to another route if needed
          // this.router.navigate(['/some-route']);
        },
        error => {
          console.error('Error updating guide status', error);
        }
      );
    }
  }
}
