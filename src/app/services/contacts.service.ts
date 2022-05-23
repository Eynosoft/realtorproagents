import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders,HttpResponse,HttpRequest } from '@angular/common/http';
import { Observable, throwError,BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';

const API_URL = environment.apiUrl+'/contacts/';
const httpOptions = { 
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
tags:any;
date:any;
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
   * Get specific contacts property data
   * 
   * @param (null)
   * @returns (object)
   */
  getContacts(): Observable<any> {
   
    return this.http
      .get(environment.apiUrl + '/contacts/getContacts')
      .pipe(catchError(this.errorHandler));
  }
  /**********************************************************************************/
  /**********************************************************************************/
   /**
   * Get contacts by id property
   *
   * @param (null)
   * @returns (object)
   */
    getContactsById(id:number): Observable<void> {
    
      return this.http
        .get<void>(environment.apiUrl + '/contacts/getContactById/' +id)
        .pipe(catchError(this.errorHandler));
    }
    /**********************************************************************************/
    /**********************************************************************************/
     /**
   * Add new contacts property
   * 
   * @param (formdata)
   * @returns (json)
   */
  addContacts( 
    first_name: string,
    last_name: string,
    company: string,
    address1: string,
    address2: string,
    city: string,
    state: string,
    zip: any,
    home_phone: any,
    work_phone: any,
    mobile_phone: any,
    fax: any,
    email: string,
    email2: string,
    birthday: string,
    stars: any,
    tags: any,
    contact_name2: string,
    contact_phone2: any,
    contact_email2: string,
    contact_birthday2: any): Observable<any> {
      const formData: FormData = new FormData();
      formData.append('first_name', first_name);
      formData.append('last_name', last_name);
      formData.append('company', company);
      formData.append('address1', address1);  
      formData.append('address2', address2);
      formData.append('city', city);
      formData.append('state', state);
      formData.append('zip', zip);
      formData.append('home_phone', home_phone);
      formData.append('work_phone', work_phone);
      formData.append('mobile_phone', mobile_phone);
      formData.append('fax', fax);
      formData.append('email', email);
      formData.append('email2', email2);
      formData.append('birthday', birthday);
      formData.append('stars', stars);
      formData.append('tags', tags);
      formData.append('contact_name2', contact_name2);
      formData.append('contact_phone2', contact_phone2);
      formData.append('contact_email2', contact_email2);
      formData.append('contact_birthday2', contact_birthday2);
      return this.http.post(API_URL + 'addContact',formData,{
        reportProgress: true,
        responseType: 'json'
      });
    }
       /**********************************************************************************/
    /**********************************************************************************/
     /**
   * update contacts property
   * 
   * @param (formdata)
   * @returns (json)
   */
  updateContacts( id: any,
    first_name: string,
    last_name: string,
    company: string,
    address1: string,
    address2: string,
    city: string,
    state: string,
    zip: any,
    home_phone: any,
    work_phone: any,
    mobile_phone: any,
    fax: any,
    email: string,
    email2: string,
    birthday: string,
    stars: any,
    tags:any,
    contact_name2: string,
    contact_phone2: any,
    contact_email2: string,
    contact_birthday2: any): Observable<any> {
      const formData: FormData = new FormData();
      formData.append('id', id);
      formData.append('first_name', first_name);
      formData.append('last_name', last_name);
      formData.append('company', company);
      formData.append('address1', address1);  
      formData.append('address2', address2);
      formData.append('city', city);
      formData.append('state', state);
      formData.append('zip', zip);
      formData.append('home_phone', home_phone);
      formData.append('work_phone', work_phone);
      formData.append('mobile_phone', mobile_phone);
      formData.append('fax', fax);
      formData.append('email', email);
      formData.append('email2', email2);
      formData.append('birthday', birthday);
      formData.append('stars', stars);
      formData.append('tags', tags);
      formData.append('contact_name2', contact_name2);
      formData.append('contact_phone2', contact_phone2);
      formData.append('contact_email2', contact_email2);
      formData.append('contact_birthday2', contact_birthday2);
      return this.http.post(API_URL + 'updateContact/'+id,formData,{
        reportProgress: true,
        responseType: 'json'
      });
    }
     /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Delete particualr contacts property
   * 
   * @param (formdata)
   * @returns (json)
   */
   deleteContact(id:number): Observable<any> {
    //const formData: FormData = new FormData();
    //formData.append('id', listings);
  
    return this.http.delete<any>(API_URL + 'deleteContact/'+id,{
      reportProgress: true,
      responseType: 'json'
    });
  }
   /**********************************************************************************/
  /**********************************************************************************/
  
  csvFileImport(records:any,headerList:any): Observable<any> {
    const formData: FormData = new FormData();
     formData.append('records', records);
     formData.append('headerList', headerList);
    //const contacts = {...records, ...headerList }
    //const contacts = Object.assign(records, headerList);

    return this.http.post(API_URL + 'import-contacts', formData,{

      reportProgress: true,
      responseType: 'json'
    });
  }
 /**********************************************************************************/
  /**********************************************************************************/
    /**
   * Add new contacts property
   * 
   * @param (formdata)
   * @returns (json)
   */
  addContactsTags( 
    tags: string,
   ): Observable<any> {
      const formData: FormData = new FormData();  
      formData.append('tags', tags);
      return this.http.post(environment.apiUrl + '/tags/addtags',formData,{
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
  getAllTags(): Observable<any> {
    return this.http
      .get(environment.apiUrl + '/tags/get-tags')
      .pipe(catchError(this.errorHandler));
  }

    /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Get specific tags property data by contactid
   * 
   * @param (null)
   * @returns (object)
   */
   getAllTagsByContactId(contactId:any): Observable<any> {

    return this.http
      .get(environment.apiUrl + '/tags/get-tags-contactid/'+contactId)
      .pipe(catchError(this.errorHandler));
  }
  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Delete particualr tags property
   * 
   * @param (formdata)
   * @returns (json)
   */
   deleteTags(id:number): Observable<any> {  
  
    return this.http.delete<any>(environment.apiUrl + '/tags/delete-tags/'+id,{
      reportProgress: true,
      responseType: 'json'
    });
  }
   /**********************************************************************************/
    /**********************************************************************************/
     /**
   * update Tags
   * 
   * @param (formdata)
   * @returns (json)
   */
      updateTags( id: any,
        tags: string): Observable<any> {
          const formData: FormData = new FormData();
          formData.append('id', id);
          formData.append('tags', tags);
          return this.http.post(environment.apiUrl +  '/tags/update-tags/'+id,formData,{
            reportProgress: true,
            responseType: 'json'
          });
        }
         /**********************************************************************************/
  /**********************************************************************************/
   /**
   * Get contacts by id property
   *
   * @param (null)
   * @returns (object)
   */
    getTagsById(id:number): Observable<void> {
    
      return this.http
        .get<void>(environment.apiUrl + '/tags/getTag/' +id)
        .pipe(catchError(this.errorHandler));
    }
    
      /**********************************************************************************/
  /**********************************************************************************/
 /**
   * Get specific contacts Taga property data
   * 
   * @param (null)
   * @returns (object)
   */
  getContactsTags(): Observable<any> {
   
    return this.http
      .get(environment.apiUrl + '/tags/getContactsTag')
      .pipe(catchError(this.errorHandler));
  }
      /**********************************************************************************/
    /**********************************************************************************/
    /**
   * Search by alphabet letter
   *
   * @param (any)
   * @returns (object)
   */
     searchByAlphabet(letter:any): Observable<any> {
    
      return this.http
        .get<void>(environment.apiUrl + '/contacts/contactSeachByAlphabet/' +letter)
        .pipe(catchError(this.errorHandler));
    }
  }