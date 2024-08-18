import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-car-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule], // Include FormsModule
  templateUrl: './car-management.component.html',
  styleUrls: ['./car-management.component.css']
})
export class CarManagementComponent implements OnInit {
  addCarForm: FormGroup;
  removeCarId: string;
  getCarId: string;
  carDetails: any;
  cars: any[] = [];
  isOtherType = false;
  private apiUrl = 'http://localhost:5202/api/admin/Admin/cars';

  constructor(private fb: FormBuilder, private http: HttpClient,private router: Router) {
    this.addCarForm = this.fb.group({
      modelName: ['', Validators.required],
      registrationNumber: ['', Validators.required],
      type: ['', Validators.required],
      fare: ['', [Validators.required, Validators.min(0)]],
      
    });
  }

  ngOnInit(): void {this.fetchAllCars()}

  getToken(): string {
    const token = localStorage.getItem('token');
    console.log('Retrieved token:', token); // Debugging line
    return token || '';
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  addCar() {
    if (this.addCarForm.valid) {
      const carData = this.addCarForm.value;
      this.http.post<any>(this.apiUrl, carData, { headers: this.getAuthHeaders() })
        .subscribe(
          response => {
            console.log('Car added:', response);
            alert('Car added successfully!');
            this.addCarForm.reset();
          },
          error => {
            console.error('Failed to add car:', error);
            alert('Failed to add car.');
          }
        );
    }
  }

  removeCar() {
    if (this.removeCarId) {
      this.http.delete(`${this.apiUrl}/${this.removeCarId}`, { headers: this.getAuthHeaders() })
        .subscribe(
          response => {
            console.log('Car removed:', response);
            alert('Car removed successfully!');
            this.removeCarId = '';
          },
          error => {
            console.error('Failed to remove car:', error);
            alert('Failed to remove car.');
          }
        );
    }
  }

  getCarById() {
    if (this.getCarId) {
      this.http.get<any>(`${this.apiUrl}/${this.getCarId}`, { headers: this.getAuthHeaders() })
        .subscribe(
          response => {
            this.carDetails = response;
            console.log('Car details:', response);
          },
          error => {
            console.error('Failed to get car:', error);
            alert('Failed to get car.');
          }
        );
    }
  }
  fetchAllCars(): void {
    this.http.get<any[]>(this.apiUrl,{ headers: this.getAuthHeaders() })
      .subscribe({
        next: (data) => {
          this.cars = data;
          console.log('All cars:', this.cars); // Debugging line
        },
        error: (err) => {
          console.error('Error fetching all cars:', err);
        }
      });
  }
  onUpdateCar(carid: any): void {
    localStorage.setItem('carid', carid.toString());
    console.log(carid)
    this.router.navigate(['/car-update']);
  }
  // END: onUpdateGuide Method

  // BEGIN: onDeleteGuide Method
  onDeleteCar(carid: string): void {
    this.http.delete(`${this.apiUrl}/${carid}`, { headers: this.getAuthHeaders() })
      .subscribe(
        response => {
          console.log('Guide deleted:', response);
          alert('Guide deleted successfully!');
          this.fetchAllCars(); // Refresh the list after deletion
        },
        error => {
          console.error('Failed to delete guide:', error);
          alert('Failed to delete guide.');
        }
      );
    }
}
