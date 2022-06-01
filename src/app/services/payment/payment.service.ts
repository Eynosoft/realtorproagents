import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders,HttpResponse,HttpRequest } from '@angular/common/http';
import { Observable, throwError,BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { TokenStorageService } from '../token-storage.service';

const API_URL = environment.apiUrl+'/braintree/';
const httpOptions = { 
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router, private tokenStorageService: TokenStorageService) { }
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
   * Get mls property data
   * 
   * @param (null)
   * @returns (object)
   */
   getToken(): Observable<any> {
    return this.http
      .get(API_URL + 'generateToken')
      .pipe(catchError(this.errorHandler));
  }
  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Get all plan list from brain tree
   * 
   * @param (null)
   * @returns (object)
   */
   getPlans(): Observable<any> {
    return this.http
      .get(API_URL + 'getAllPlans')
      .pipe(catchError(this.errorHandler));
  }
  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Payment for the plan at brain tree
   * 
   * @param (null)
   * @returns (object)
   */
   subscribePlan(paymentMethodToken: any, planId: any, first_name: any, last_name: any, cardnumber: any, securitycode: any, expiry_date: any, expiry_year: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('paymentMethodToken', paymentMethodToken);
    formData.append('planId', planId);
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('cardnumber', cardnumber);
    formData.append('securitycode', securitycode);
    formData.append('expiry_date', expiry_date);
    formData.append('expiry_year', expiry_year);
    return this.http
      .post(API_URL + 'subscribePlan',formData,{
        reportProgress: true,
        responseType: 'json'
      })
      .pipe(catchError(this.errorHandler));
  }
  /**********************************************************************************/
  /**********************************************************************************/

  
}
