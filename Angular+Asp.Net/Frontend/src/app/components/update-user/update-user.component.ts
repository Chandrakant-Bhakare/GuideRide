import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  profileForm: FormGroup;
  apiUrl = 'http://localhost:5202/api/User'; // Replace with your API URL
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    // Initialize the form with validators
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', Validators.required], // Updated to address
      dateOfBirth: ['', Validators.required] // Updated to dateOfBirth
    });

    // Load user data
    this.loadUserData();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  loadUserData(): void {
    this.http.get<any>(`${this.apiUrl}/profile`, { headers: this.getAuthHeaders() }).subscribe(user => {
      this.profileForm.patchValue({
        name: user.name,
        email: user.email,
        address: user.address,
        dateOfBirth: user.dateOfBirth
      });
    }, error => {
      console.error('Error loading user data', error);
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.http.put<any>(`${this.apiUrl}/update`, this.profileForm.value, {
        headers: this.getAuthHeaders() // Add the headers here
      }).subscribe(response => {
        this.successMessage = 'Profile updated successfully';
        this.errorMessage = ''; // Clear any previous error message
      }, error => {
        this.errorMessage = 'Failed to update profile. Please check your details.';
        this.successMessage = ''; // Clear any previous success message
        console.error('Error updating profile', error);
      });
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
      this.successMessage = ''; // Clear any previous success message
    }
  }
}
