import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  isCollapsed = false;

  constructor(private tokenStorageService: TokenStorageService,private router: Router,private authService: AuthService) { }
  
  ngOnInit(): void {

    this.isLoggedIn$ = this.authService.isLoggedIn;
  
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.authService.logout();
    //this.router.navigateByUrl('client-login');
  }

}
