import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders,HttpResponse,HttpRequest } from '@angular/common/http';
import { Observable, throwError,BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { TokenStorageService } from '../token-storage.service';

const API_URL = environment.apiUrl+'/mls/';
const httpOptions = { 
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class MlsService {
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
   getMls(): Observable<any> {
   
    return this.http
      .get(environment.apiUrl + '/mls/getMls')
      .pipe(catchError(this.errorHandler));
  }
  /**********************************************************************************/
  /**********************************************************************************/
}
