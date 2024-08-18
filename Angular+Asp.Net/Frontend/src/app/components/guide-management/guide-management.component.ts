import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-guide-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './guide-management.component.html',
  styleUrls: ['./guide-management.component.css']
})
export class GuideManagementComponent implements OnInit {
  guideForm: FormGroup;
  ratings: number[] = [1, 2, 3, 4, 5];
  removeId: string;
  getId: string;
  guide: any;
  guides: any[] = [];
  private apiUrl = 'http://localhost:5202/api/admin/Admin/guides';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.guideForm = this.fb.group({
      name: ['', Validators.required],
      rating: ['', Validators.required],
      fare: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.fetchAllGuides();
  }

  getToken(): string {
    const token = localStorage.getItem('token');
    
    return token || '';
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  onAddGuide() {
    if (this.guideForm.valid) {
      const guideData = this.guideForm.value;
      this.http.post<any>(this.apiUrl, guideData, { headers: this.getAuthHeaders() })
        .subscribe(
          response => {
            console.log('Guide added:', response);
            alert('Guide added successfully!');
            this.guideForm.reset();
            this.fetchAllGuides(); // Refresh the list after adding a guide
          },
          error => {
            console.error('Failed to add guide:', error);
            alert('Failed to add guide.');
          }
        );
    }
  }

  onRemoveGuide() {
    if (this.removeId) {
      this.http.delete(`${this.apiUrl}/${this.removeId}`, { headers: this.getAuthHeaders() })
        .subscribe(
          response => {
            console.log('Guide removed:', response);
            alert('Guide removed successfully!');
            this.removeId = '';
            this.fetchAllGuides(); // Refresh the list after removing a guide
          },
          error => {
            console.error('Failed to remove guide:', error);
            alert('Failed to remove guide.');
          }
        );
    }
  }

  onGetGuideById() {
    if (this.getId) {
      this.http.get<any>(`${this.apiUrl}/${this.getId}`, { headers: this.getAuthHeaders() })
        .subscribe(
          response => {
            this.guide = response;
            console.log('Guide details:', response);
          },
          error => {
            console.error('Failed to get guide:', error);
            alert('Failed to get guide.');
          }
        );
    }
  }

  fetchAllGuides(): void {
    this.http.get<any[]>(this.apiUrl, { headers: this.getAuthHeaders() })
      .subscribe(
        response => {
          this.guides = response;
          console.log('Fetched guides:', this.guides);
        },
        error => {
          console.error('Failed to fetch guides:', error);
        }
      );
  }

  // BEGIN: onUpdateGuide Method
  onUpdateGuide(guideid: any): void {
    localStorage.setItem('guideid', guideid.toString());
    console.log(guideid)
    this.router.navigate(['/guide-update']);
  }
  // END: onUpdateGuide Method

  // BEGIN: onDeleteGuide Method
  onDeleteGuide(guideId: string): void {
    this.http.delete(`${this.apiUrl}/${guideId}`, { headers: this.getAuthHeaders() })
      .subscribe(
        response => {
          console.log('Guide deleted:', response);
          alert('Guide deleted successfully!');
          this.fetchAllGuides(); // Refresh the list after deletion
        },
        error => {
          console.error('Failed to delete guide:', error);
          alert('Failed to delete guide.');
        }
      );
  }
  // END: onDeleteGuide Method
}
