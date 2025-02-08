import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header-form',
  imports: [
    RouterLink
  ],
  templateUrl: './header-form.component.html',
  standalone: true,
  styleUrl: './header-form.component.css'
})
export class HeaderFormComponent {

}
