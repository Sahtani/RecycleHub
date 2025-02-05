import { Component } from '@angular/core';
import {NavbarComponent} from '../shared/navbar/navbar.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ NavbarComponent, RouterOutlet],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
