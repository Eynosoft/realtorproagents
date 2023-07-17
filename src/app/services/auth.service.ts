import { Injectable,  } from '@angular/core';
import { HttpClient,HttpHeaders,HttpResponse,HttpRequest } from '@angular/common/http';
import { Observable, throwError,BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';


//const AUTH_API = 'http://localhost/realtorproagents/backend/api/auth/';
//const bot_captcha_API = 'http://localhost/realtorproagents/backend/api/botCaptcha/displayBotCaptcha';
//const AUTH_API = 'http://wibeit.com/angular_ci/realtorproagents/backend/api/auth/';
const AUTH_API = 'https://realtorproagents.com/backend/api/auth/';
const httpOptions = { 
  headers: new HttpHeaders({'Content-Type': 'application/json'})
  //headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  constructor(private http: HttpClient, private router : Router,private tokenStorageService: TokenStorageService) { }
  get isLoggedIn() {
    if(!!this.tokenStorageService.getToken()) {
      this.loggedIn.next(true);
    } 
    return this.loggedIn.asObservable();
  }
  login(email:string, password: string): Observable<any> {

    return this.http.post(AUTH_API + 'signin',{
      email,
      password
    },httpOptions)
    .pipe(
      tap(data => {
        // debug here
        this.loggedIn.next(true);
        console.log(data);
      }),
      catchError(this.handleError)
    );
  }
  private handleError(error: any) {
    return throwError(error);
  }
  register(name: string, phone: string, email: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup',{
      name,
      phone,
      email
    },httpOptions);
  }
  /*send(data: Object): Observable<any> {
    console.log('send');
    //return this.http.post(bot_captcha_API,{data},httpOptions);
  }*/
  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/client-login']);
  }
}
