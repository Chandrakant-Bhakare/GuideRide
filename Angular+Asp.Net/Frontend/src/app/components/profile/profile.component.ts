import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControlName, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
 // Import FormsModule
 import { HttpClient, HttpHeaders ,HttpClientModule} from '@angular/common/http';

 //import { HttpClient HttpClientModule } from '@angular/common/http';  // Import HttpClient
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit{

  apiUrl = 'http://localhost:5202/api/User/profile';
  user: any = {
    name: '',
    city: '',
    dob: '',
    email: '',
    password: '*******'
  };

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.fetchUserData();
  }


  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  fetchUserData() {
    this.http.get(this.apiUrl,{ headers: this.getAuthHeaders()}).subscribe({
      next: (data: any) => {
        this.user = data;  // Set user data from the response
        
        console.log(this.user);
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      }
    });
  }

  editProfile() {
    this.router.navigate(['/update'], { state: { user: this.user } });
  }

}
