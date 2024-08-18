import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guide-availability',
  standalone: true,
  imports: [CommonModule, HttpClientModule,RouterModule],
  templateUrl: './guide-availability.component.html',
  styleUrls: ['./guide-availability.component.css']
})


export class GuideAvailabilityComponent implements OnInit {
  apiUrl = 'http://localhost:5202/api/User/available-guides';
  guides: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchGuides();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  fetchGuides(): void {
    this.http.get<any[]>(this.apiUrl, { headers: this.getAuthHeaders() }).subscribe({
      next: (data) => {
        console.log('Received guide data:', data); // Debugging line
        this.guides = data;
      },
      error: (err) => {
        console.error('Error fetching guide data:', err);
      }
    });
  }

  bookGuide(guide: any): void {
    // Implement booking logic here
    console.log('Booking guide:', guide);
  }
}
