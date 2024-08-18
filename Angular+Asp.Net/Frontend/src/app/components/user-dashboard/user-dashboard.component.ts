import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [RouterModule,ProfileComponent], // Add RouterModule to imports
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
