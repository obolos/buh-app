import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { IUser } from '../../model-user/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  date: Date = new Date();
  user: IUser;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user')); 
  }


  onLogout() {    
      this.authService.logout(); 
      this.router.navigate(['']);  
    
  }
}
