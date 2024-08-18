import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],  // Removed FormGroup from imports
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent {
  paymentForm: FormGroup;

  constructor(private fb: FormBuilder, private router:Router) {
    this.paymentForm = this.fb.group({
      cardNumber: [''],
      expiryDate: [''],
      cvv: ['']
    });
  }

  submitPayment(): void {
    if (this.paymentForm.valid) {
      this.router.navigate(['/payment'])
      // Handle the payment logic here
      console.log('Payment Form Data:', this.paymentForm.value);
    } else {
      console.error('Payment Form is not valid');
      this.router.navigate(['/payment-failure'])
    }
  }
}
