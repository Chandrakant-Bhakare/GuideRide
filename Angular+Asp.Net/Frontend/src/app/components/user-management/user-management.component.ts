import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']  // Corrected `styleUrl` to `styleUrls`
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // Set up HTTP headers with the authorization token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Make the HTTP GET request with the headers
    this.http.get('http://localhost:5202/api/User/users', { headers })
      .subscribe((data: any) => {
        this.users = data;
      }, error => {
        // Handle error case here
        console.error('Error fetching users:', error);
      });
  }
}
