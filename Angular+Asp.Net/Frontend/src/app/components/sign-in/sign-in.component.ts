import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  signupForm: FormGroup;
  registrationSuccessful: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      address: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      const email = formData.email;  // Extracting the email from form data

      const apiUrl = 'http://localhost:5202/api/Auth/register';

      this.http.post(apiUrl, formData).subscribe({
        next: (response) => {
          console.log('User signed in successfully', response);
          this.registrationSuccessful = true;

          // Send the confirmation email after successful registration
          this.sendConfirmationEmail(email);

          // Clear the form fields
          this.signupForm.reset();
        },
        error: (error) => {
          console.error('Error during signin', error);
        }
      });
    }
  }

  // Method to send a confirmation email
  sendConfirmationEmail(email: string) {
    const emailApiUrl = 'http://localhost:5202/api/Email/send-confirmation-email';
    const emailData = { email: email };

    this.http.post(emailApiUrl, emailData).subscribe({
      next: (response) => {
        console.log('Confirmation email sent successfully', response);
      },
      error: (error) => {
        console.error('Error sending confirmation email', error);
      }
    });
  }
}
