import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient,HttpHeaders,HttpResponse,HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError,BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
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
   * Get specific event property data
   * 
   * @param (null)
   * @returns (object)
   */
  getCalendarEvent(): Observable<any> {
   
    return this.http
      .get(environment.apiUrl + '/calendar/calendar-event')
      .pipe(catchError(this.errorHandler));
  }


}