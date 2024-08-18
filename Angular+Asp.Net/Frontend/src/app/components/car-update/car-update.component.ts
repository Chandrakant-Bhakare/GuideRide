import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-car-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './car-update.component.html',
  styleUrl: './car-update.component.css'
})
export class CarUpdateComponent implements OnInit{
  updatecarForm: FormGroup;
  carId: number;
  isOtherType = false;
  apiUrl = 'http://localhost:5202/api/admin/Admin/cars';
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router // Inject Router
  ) {
    this.updatecarForm = this.fb.group({
      id: [''], // Ensure fields are editable
      modelName: [''], // Ensure fields are editable
      registrationNumber:[''],
      type: [''], // Ensure fields are editable
      fare: [''], // Ensure fields are editable
      status: [false, Validators.required] // Keep the 
      
    });
  }
  ngOnInit(): void {
    this.carId=Number(localStorage.getItem('carid')) ;
    if(this.carId){
      this.fetchCarDetails();
    } else {
      alert('Car ID is not available in local storage.');
    }


  }
  fetchCarDetails(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.get<any>(`${this.apiUrl}/${this.carId}`, { headers }).subscribe(
      data => {
        this.updatecarForm.patchValue(data);
      },
      error => {
        console.error('Error fetching guide details', error);
      }
    );
  }
  updateCarStatus(): void {
    if (this.updatecarForm.valid) {
      const updatedData = this.updatecarForm.value;
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      });
      this.http.put<any>(`${this.apiUrl}/${this.carId}`, updatedData, { headers }).subscribe(
        response => {
          this.router.navigate(['/car-management']);
          alert('Car status updated successfully');
        },
        
        error => {
          console.error('Error updating guide status', error);
        }
      );
    }
  }
  onTypeChange(event: any): void {
    this.isOtherType = event.target.value === 'other';
    if (!this.isOtherType) {
      this.updatecarForm.get('otherSeats')?.setValue('');
    }
  }
}
