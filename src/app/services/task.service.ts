import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient,HttpHeaders,HttpResponse,HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError,BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';

const httpOptions = { 
  headers: new HttpHeaders({'Content-Type': 'application/json'})
  
};
@Injectable({
  providedIn: 'root'
})
export class TaskService {
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
  getTaskEvent(): Observable<any> {
   
    return this.http
      .get(environment.apiUrl + '/task/calendar-event')
      .pipe(catchError(this.errorHandler));
  }

      /**********************************************************************************/
  /**********************************************************************************/
 /**
   * Get All task property data
   * 
   * @param (null)
   * @returns (object)
   */
  getAllTask(): Observable<any> {
   
    return this.http
      .get(environment.apiUrl + '/task/get-task')
      .pipe(catchError(this.errorHandler));
  }
    /**********************************************************************************/
    /**********************************************************************************/
     /**
   * Add new Task property
   * 
   * @param (formdata)
   * @returns (json)
   */
      addTask( 
        date: string,
        task: string,
        currentId:any,
      ): Observable<any> {
 
          const formData: FormData = new FormData();
          formData.append('date', date);
          formData.append('task', task);
          formData.append('contact_id', currentId);
         
          return this.http.post(environment.apiUrl + '/task/addtask',formData,{
            reportProgress: true,
            responseType: 'json'
          });
        }
            /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Delete particualr task property
   * 
   * @param (formdata)
   * @returns (json)
   */
   deleteTaskList(id:number): Observable<any> {
    //const formData: FormData = new FormData();
    //formData.append('id', listings);

    return this.http.delete<any>(environment.apiUrl + '/task/delete-task/'+id,{
      reportProgress: true,
      responseType: 'json'
    });
  }
}
