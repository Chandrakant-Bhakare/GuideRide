import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5202/api/admin/Admin/guides';

  constructor(private http: HttpClient) {}

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

  addGuide(guideData: any): Observable<any> {
    console.log('Adding guide with data:', guideData); // Debugging line
    return this.http.post<any>(this.apiUrl, guideData, { headers: this.getAuthHeaders() });
  }

  removeGuide(guideId: string): Observable<any> {
    console.log('Removing guide with ID:', guideId); // Debugging line
    return this.http.delete<any>(`${this.apiUrl}/${guideId}`, { headers: this.getAuthHeaders() });
  }

  getGuideById(guideId: string): Observable<any> {
    console.log('Getting guide with ID:', guideId); // Debugging line
    return this.http.get<any>(`${this.apiUrl}/${guideId}`, { headers: this.getAuthHeaders() });
  }
}
