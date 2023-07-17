import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {
  title = '';
  customClass:boolean = false;
  currentUser:any;
  constructor(private tokenStorage: TokenStorageService, private titleService: Title) { }
 
  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    this.title = this.titleService.getTitle();
  }
  clickEvent(){
    this.customClass = !this.customClass;       
  }
}
