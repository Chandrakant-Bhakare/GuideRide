import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-payment-failure',
  standalone: true,
  imports :[RouterLink,RouterLinkActive],
  templateUrl: './payment-failure.component.html',
  styleUrls: ['./payment-failure.component.css']
})
export class PaymentFailureComponent {
constructor(private router:Router){}
}
