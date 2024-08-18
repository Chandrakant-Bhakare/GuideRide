import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive,Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.isLoggedIn = !!localStorage.getItem('token'); // Check if token exists in local storage
    const role = localStorage.getItem('role');
    this.isAdmin = role === 'Admin';
  }

  logout() {
    localStorage.removeItem('token'); // Remove token from local storage
    localStorage.removeItem('role'); // Remove role from local storage
    this.isLoggedIn = false; // Update login status
    this.isAdmin = false; // Update admin status
    this.router.navigate(['/login']); // Redirect to login page
  }
}
