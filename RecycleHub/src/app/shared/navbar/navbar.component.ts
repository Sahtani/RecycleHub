import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../core/services/auth.service';
import {User} from '../../core/models/user.model';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  public  userLogged!:User | null ;

  constructor( private authservice: AuthService) {
  }

  ngOnInit() {
 this.userLogged = this.authservice.loggedUser ;


  }


}
