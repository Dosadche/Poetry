import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public currentUser: User = JSON.parse(localStorage.getItem('user'))

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public logOut(){
    this.router.navigate(['sign-in'])
  }
}
