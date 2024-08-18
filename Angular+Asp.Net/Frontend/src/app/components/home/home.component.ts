import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AboutUsComponent } from '../about-us/about-us.component';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,HomeComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  ImagePath: string;
  
  constructor(){
    this.ImagePath = "../../../Assests/Car10.jpeg"
  }

  ngOnInit(){
    
  }

}
