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
   subscribePlan(paymentMethodToken: any,paymentNonce:any, planId: any, cardnumber:any,expiry_date:any,securitycode:any,first_name: any, last_name: any): Observable<any> {

    const formData: FormData = new FormData();
    formData.append('paymentMethodToken', paymentMethodToken);
    formData.append('paymentNonce', paymentNonce);
    formData.append('planId', planId);
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('cardnumber', cardnumber);
    formData.append('expiry_date', expiry_date);
    formData.append('securitycode', securitycode);
  
    //formData.append('expiry_year', expiry_year);
    return this.http
      .post(API_URL + 'subscribePlan',formData,{
        reportProgress: true,
        responseType: 'json'
      })
      .pipe(catchError(this.errorHandler));
  }

  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Add Agent plan info 
   * 
   * @param (null)
   * @returns (object)
   */
   agentPlan(payment_details:any,userid:any,subscriptionId:any,plan_name:any,amount:any,billingCycle:any,planStatus:any): Observable<any> {

    const formData: FormData = new FormData();
    
    formData.append('payment_details', payment_details);
    formData.append('userid', userid);
    formData.append('subscriptionId', subscriptionId);
    formData.append('plan_name', plan_name);
    formData.append('amount', amount);
    formData.append('billingCycle', billingCycle);
    formData.append('planStatus', planStatus);

    return this.http
      .post(environment.apiUrl+'/payment/'+'agent-plan',formData,{
        reportProgress: true,
        responseType: 'json'
      })
      .pipe(catchError(this.errorHandler));
  }
  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Add Payment Details info 
   * 
   * @param (null)
   * @returns (object)
   */
   paymentDetails(userid:any,paymentMethod:any,planId:any,membershipname:any,duration:any,currentStatus:any,amount:any,transectionId:any,paymentStatus:any,paymentResponse:any): Observable<any> {

    const formData: FormData = new FormData();

    formData.append('userid', userid);
    formData.append('paymentMethod', paymentMethod);
    formData.append('planId', planId);
    formData.append('membershipname', membershipname);
    formData.append('duration', duration);
    formData.append('currentStatus', currentStatus);
    formData.append('amount', amount);
    formData.append('transectionId', transectionId);
    formData.append('paymentStatus', paymentStatus);
    formData.append('paymentResponse', paymentResponse);
    return this.http
      .post(environment.apiUrl+'/payment/' + 'payment-details',formData,{
        reportProgress: true,
        responseType: 'json'
      })
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
   idxOrderDetails(paymentMode:any,cardNumber:any,securityCode:any,expireDate:any,first_name:any,last_name:any,adresss:any,city:any,state:any,zip:any,paymentId:any,IdxMlsPeriod:any): Observable<any> {

    const formData: FormData = new FormData();

    formData.append('paymentMode', paymentMode);
    formData.append('cardNumber', cardNumber);
    formData.append('securityCode', securityCode);
    formData.append('expireDate', expireDate);
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('adresss', adresss);
    formData.append('city', city);
    formData.append('state', state);
    formData.append('zip', zip);
    formData.append('paymentId', paymentId);
    formData.append('IdxMlsPeriod', IdxMlsPeriod);
    return this.http
      .post(environment.apiUrl+'/payment/' + 'order-details',formData,{
        reportProgress: true,
        responseType: 'json'
      })
      .pipe(catchError(this.errorHandler));
  }

  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Get all plan payment details 
   * 
   * @param (null)
   * @returns (object)
   */
   getPlanDetails(): Observable<any> {

    return this.http
      .get(environment.apiUrl+'/payment/' + 'get-agentPlan')
      .pipe(catchError(this.errorHandler));
  }
}
