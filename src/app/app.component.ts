import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { TokenStorageService } from './services/token-storage.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'realtorproagents-app';

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showClientBoard = false;
  username?: string;
  success: any;
  userpass: any
  constructor(private tokenStorageService: TokenStorageService, private router: Router, private titleService: Title, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    const appTitle = this.titleService.getTitle();
    this.router
      .events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child.firstChild) {
            child = child.firstChild;
          }
          if (child.snapshot.data['title']) {
            return child.snapshot.data['title'];
          }
          return appTitle;
        })
      ).subscribe((ttl: string) => {
        this.titleService.setTitle(ttl);
      });

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      //this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      //this.showClientBoard = this.roles.includes('ROLE_CLIENT');

      this.username = user.name;
    } else {
      //this.logout();    
    }

    //var pass = this.getData();
    this.success = true;
 
   //let user_pass =  this.getSessionData()
   let user_pass = this.getCookie("userpassword");

    if(!user_pass){
      this.userpass = prompt("Please enter password", "");
      
      if ("userpass@123" == this.userpass && this.userpass != null ) {
        this.success = true;
       //  this.setSessionData(pass);
       this.setCookie('userpassword',this.userpass,1);
        
      } else {
        this.success = false;
      }
      
    }
  }
   setCookie(name:any,value:any,days:any) {
    const d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

 getCookie(name:any) {
  let cname = name + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(cname) == 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return "";
}

  getData() {
    return localStorage.getItem('userpassword')
  }
  setSessionData(pass:any) {
     sessionStorage.setItem('userpassword',pass)
  }
  getSessionData() {
    return sessionStorage.getItem('userpassword')
  }
  logout(): void {
    this.tokenStorageService.signOut();
    //window.location.reload();
    this.router.navigateByUrl('client-login');
  }
  simpleAlert() {
    Swal.fire('Hello world!');
  }

  alertWithSuccess() {
    Swal.fire('Thank you...', 'You submitted succesfully!', 'success')
  }

  confirmBox() {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }
}
