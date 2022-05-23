import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders,HttpResponse,HttpRequest } from '@angular/common/http';
import { Observable, throwError,BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { TokenStorageService } from '../token-storage.service';


const API_URL = environment.apiUrl+'/emailProperty/';
const httpOptions = { 
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class EmailAlertService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router,private tokenStorageService: TokenStorageService) { }
 /**********************************************************************************/
  /**********************************************************************************/
  /**
   * This check if login or not
   * 
   * @param (null)
   * @returns (object)
   */
   get isLoggedIn() {
    if(!!this.tokenStorageService.getToken()) {
      this.loggedIn.next(true);
    } 
    return this.loggedIn.asObservable();
  }
  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Error Handler function
   * 
   * @param (any)
   * @returns (object)
   */
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Error Handler
   * 
   * @param (any)
   * @returns (object)
   */
  private handleError(error: any) {
    return throwError(error);
  }
    /**********************************************************************************/
    /**********************************************************************************/
     /**
   * Add new Email Alert property
   * 
   * @param (formdata)
   * @returns (json)
   */
      addEmailAlert( 
        location: string,
        property_type: string,
        min_price: any,
        max_price: any,
        beds: any,
        baths: any,
        feature: string,
        name: string,
        email: any,
        phone: any,
       ): Observable<any> {
          const formData: FormData = new FormData();
          formData.append('location', location);
          formData.append('property_type', property_type);
          formData.append('min_price', min_price);
          formData.append('max_price', max_price);  
          formData.append('beds', beds);
          formData.append('baths', baths);
          formData.append('feature', feature);
          formData.append('name', name);
          formData.append('email', email);
          formData.append('phone', phone);
          return this.http.post(API_URL + 'email-property-alert',formData,{
            reportProgress: true,
            responseType: 'json'
          });
        }
}
