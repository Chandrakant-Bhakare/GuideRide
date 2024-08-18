import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  roles: string[] = ['User', 'Admin'];

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      
    });
  }

  private apiUrl: string = 'http://localhost:5202/api/Auth/login'; 
  
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.http.post<any>(this.apiUrl, { email, password })
        .subscribe(
          response => {
            console.log('Login successful:', response);
            alert('Login successful');

            const token = response.token;
            const userRole = response.role; // Assuming the role is included in the response

            localStorage.setItem('token', token); // Store token in local storage
            localStorage.setItem('role', userRole); // Store role in local storage

            // Redirect based on the role
            if (userRole === 'Admin') {
              this.router.navigate(['/admin-dashboard']);
            } 
            else if(userRole === 'User'){
              this.router.navigate(['/user-dashboard']);
            }
            else {
              this.router.navigate(['/home']);
            }
          },
          error => {
            console.error('Login failed:', error);
            alert('Invalid email or password');
          }
        );
    }
  }
}
