import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//const API_URL = 'http://localhost/realtorproagents/backend/api/auth/';
//const API_URL = 'http://wibeit.com/angular_ci/realtorproagents/backend/api/auth/';
const API_URL = 'https://realtorproagents.com/realtorproagents/backend/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
message:any;
  constructor(private http: HttpClient) {}
  
setMessage(data:any){
  
  this.message = data;

}
getMessage(){
  return this.message;
}


  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getClientBoard(): Observable<any> {
    return this.http.get(API_URL + 'client', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin',{ responseType: 'text' });
  }
}
