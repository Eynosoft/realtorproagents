import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders,HttpResponse,HttpRequest } from '@angular/common/http';
import { Observable, throwError,BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';

const API_URL = environment.apiUrl+'/profile/';
const httpOptions = { 
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
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
   * Add new profile property
   * 
   * @param (formdata)
   * @returns (json)
   */
      addProfile( 
        userid:any,
        first_name: string,
        last_name: string,
        company_broker: string,
        address: string,
        city: string,
        state: string,
        zip: string,
        business_phone: any,
        cell_phone: any,
        fax: any,
        social_links: any,
        facebook: any,
        twitter: string,
        linkedin: string,
        youtube: string,
        instagram: any,
       ): Observable<any> {
      
          const formData: FormData = new FormData();
          formData.append('userid', userid);
          formData.append('first_name', first_name);
          formData.append('last_name', last_name);
          formData.append('company_broker', company_broker);
          formData.append('address', address);  
          formData.append('city', city);
          formData.append('state', state);
          formData.append('zip', zip);
          formData.append('business_phone', business_phone);
          formData.append('cell_phone', cell_phone);
          formData.append('fax', fax);
          formData.append('social_links', social_links);
          formData.append('facebook', facebook);
          formData.append('twitter', twitter);
          formData.append('linkedin', linkedin);
          formData.append('youtube', youtube);
          formData.append('instagram', instagram);
          return this.http.post(API_URL + 'add-profile',formData,{
            reportProgress: true,
            responseType: 'json'
          });
        }
           /**********************************************************************************/
        /**********************************************************************************/
         /**
       * update profile property
       * 
       * @param (formdata)
       * @returns (json)
       */
      updateContacts( id: any,
        first_name: string,
        last_name: string,
        company_broker: string,
        address: string,
        city: string,
        state: string,
        zip: string,
        business_phone: any,
        cell_phone: any,
        social_links: any,
        facebook: any,
        twitter: any,
        linkedin: string,
        youtube: string,
        instagram: string,
        ): Observable<any> {
          const formData: FormData = new FormData();
          formData.append('id', id);
          formData.append('first_name', first_name);
          formData.append('last_name', last_name);
          formData.append('company_broker', company_broker);
          formData.append('address', address);  
          formData.append('city', city);
          formData.append('state', state);
          formData.append('zip', zip);
          formData.append('business_phone', business_phone);
          formData.append('cell_phone', cell_phone);
          formData.append('social_links', social_links);
          formData.append('facebook', facebook);
          formData.append('twitter', twitter);
          formData.append('linkedin', linkedin);
          formData.append('youtube', youtube);
          formData.append('instagram', instagram);
  
          return this.http.post(API_URL + 'update-profile/'+id,formData,{
            reportProgress: true,
            responseType: 'json'
          });
        }
         /**********************************************************************************/
      /**********************************************************************************/
  /**
   * Get specific tags property data
   * 
   * @param (null)
   * @returns (object)
   */
  getAllprofile(userid:any): Observable<any> {
    return this.http
      .get(environment.apiUrl + '/profile/get-profile/'+userid)
      .pipe(catchError(this.errorHandler));
  }
}
