import { Component } from '@angular/core';
import { GuideManagementComponent } from '../guide-management/guide-management.component';
import { CarManagementComponent } from '../car-management/car-management.component';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [GuideManagementComponent,CarManagementComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}
