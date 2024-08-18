import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CarsComponent } from '../cars/cars.component';

@Component({
  selector: 'app-fleet',
  standalone: true,
  imports: [RouterLink,RouterLinkActive, CarsComponent],
  templateUrl: './fleet.component.html',
  styleUrl: './fleet.component.css'
})
export class FleetComponent {

}
