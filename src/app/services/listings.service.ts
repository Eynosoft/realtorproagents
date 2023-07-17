import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders,HttpResponse,HttpRequest } from '@angular/common/http';
import { Observable, throwError,BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';
import { ListingCategory } from '../interface/listing-category';

const API_URL = environment.apiUrl+'/listing/';
const httpOptions = { 
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ListingsService {
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
   * Get All the listing category
   * 
   * @param (null)
   * @returns (object)
   */
  getListingCategory(): Observable<any> {
    return this.http.get(environment.apiUrl+'/listingcategory/getAllListingCategory').pipe(catchError(this.errorHandler)) 
  }
  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Get specific listing property data
   * 
   * @param (null)
   * @returns (object)
   */
  getListings(): Observable<any> {
    return this.http
      .get(environment.apiUrl + '/listing/getListings')
      .pipe(catchError(this.errorHandler));
  }
  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Get listing by id property
   * 
   * @param (null)
   * @returns (object)
   */
    getListingsById(id:any): Observable<any> {
    return this.http
      .get(environment.apiUrl + '/listing/getListingById/'+id)
      .pipe(catchError(this.errorHandler));
    }
  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Add new listing property
   * 
   * @param (formdata)
   * @returns (json)
   */
  addListing(mls: string,
    address: string,
    city: string,
    state: string,
    zip: string,
    title: string,
    description: string,
    price: string,
    main_image: string,
    additional_image: string,
    selectedMainFile: any,
    selectedFiles:any,      

    category_name: string,
    year_built: string,
    square_feet: string,
    bedrooms: string,
    bathrooms: string,
    virtual_tour_url: string,
    featured_listing: string,
    sold_home: string,
    open_house_start_date: string,
    open_house_end_date: string,
    widget_code: string,
    google_map: string,
    zillow: string,
    syndicate_listing: string,
    sort_order: string): Observable<any> {
    const formData: FormData = new FormData();
    console.log(open_house_start_date);
    console.log(open_house_end_date);
    if(typeof open_house_start_date == 'undefined') {
      open_house_start_date = '';
    }
    if(typeof open_house_end_date == 'undefined') {
      open_house_end_date = '';
    }  
    formData.append('mls', mls);
    formData.append('address', address);
    formData.append('city', city);
    formData.append('state', state);  
    formData.append('zip', zip);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('main_image', main_image);
    formData.append('additional_image', additional_image);
    //formData.append('selectedMainFile', selectedMainFile);
    for (var i = 0; i < selectedMainFile.length; i++) { 
      console.log('selectedMainFile='+selectedMainFile[i]);
      formData.append("selectedMainFile[]", selectedMainFile[i]);
    }
    //formData.append('selectedFiles', selectedFiles);
    for (var i = 0; i < selectedFiles.length; i++) { 
      console.log('selectedFiles='+selectedFiles[i]);
      formData.append("selectedFiles[]", selectedFiles[i]);
    }
    formData.append('category_name', category_name);
    formData.append('year_built', year_built);
    formData.append('square_feet', square_feet);
    formData.append('bedrooms', bedrooms);
    formData.append('bathrooms', bathrooms);
    formData.append('virtual_tour_url', virtual_tour_url);
    formData.append('featured_listing', featured_listing);
    formData.append('sold_home', sold_home);
    formData.append('open_house_start_date', JSON.stringify(open_house_start_date));
    formData.append('open_house_end_date', JSON.stringify(open_house_end_date));

    formData.append('widget_code', widget_code);
    formData.append('google_map', google_map);
    formData.append('zillow', zillow);
    formData.append('syndicate_listing', syndicate_listing);
    formData.append('sort_order', sort_order);

    return this.http.post(API_URL + 'create',formData,{
      reportProgress: true,
      responseType: 'json'
    });
  }
  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Add new listing property
   * 
   * @param (formdata)
   * @returns (json)
   */
   updateListing(id: any,mls: string,
    address: string,
    city: string,
    state: string,
    zip: string,
    title: string,
    description: string,
    price: string,
    main_image: string,
    additional_image: string,
    selectedMainFile: any,
    selectedFiles:any,      

    category_name: string,
    year_built: string,
    square_feet: string,
    bedrooms: string,
    bathrooms: string,
    virtual_tour_url: string,
    featured_listing: string,
    sold_home: string,
    open_house_start_date: string,
    open_house_end_date: string,
    widget_code: string,
    google_map: string,
    zillow: string,
    syndicate_listing: string,
    sort_order: string): Observable<any> {
    const formData: FormData = new FormData();
    console.log(open_house_start_date);
    console.log(open_house_end_date);
    if(typeof open_house_start_date == 'undefined') {
      open_house_start_date = '';
    }
    if(typeof open_house_end_date == 'undefined') {
      open_house_end_date = '';
    }  
    formData.append('id', id);
    formData.append('mls', mls);
    formData.append('address', address);
    formData.append('city', city);
    formData.append('state', state);  
    formData.append('zip', zip);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('main_image', main_image);
    formData.append('additional_image', additional_image);
    //formData.append('selectedMainFile', selectedMainFile);
    for (var i = 0; i < selectedMainFile.length; i++) { 
      console.log('selectedMainFile='+selectedMainFile[i]);
      formData.append("selectedMainFile[]", selectedMainFile[i]);
    }
    //formData.append('selectedFiles', selectedFiles);
    for (var i = 0; i < selectedFiles.length; i++) { 
      console.log('selectedFiles='+selectedFiles[i]);
      formData.append("selectedFiles[]", selectedFiles[i]);
    }
    formData.append('category_name', category_name);
    formData.append('year_built', year_built);
    formData.append('square_feet', square_feet);
    formData.append('bedrooms', bedrooms);
    formData.append('bathrooms', bathrooms);
    formData.append('virtual_tour_url', virtual_tour_url);
    formData.append('featured_listing', featured_listing);
    formData.append('sold_home', sold_home);
    formData.append('open_house_start_date', JSON.stringify(open_house_start_date));
    formData.append('open_house_end_date', JSON.stringify(open_house_end_date));

    formData.append('widget_code', widget_code);
    formData.append('google_map', google_map);
    formData.append('zillow', zillow);
    formData.append('syndicate_listing', syndicate_listing);
    formData.append('sort_order', sort_order);

    return this.http.post(API_URL + 'update/'+id,formData,{
      reportProgress: true,
      responseType: 'json'
    });
  }
  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Delete particualr listing property
   * 
   * @param (formdata)
   * @returns (json)
   */
   deleteListing(listings: any): Observable<any> {
    //const formData: FormData = new FormData();
    //formData.append('id', listings);
    return this.http.delete(API_URL + 'delete/'+listings,{
      reportProgress: true,
      responseType: 'json'
    });
  }
  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Delete a particualr listing property
   * 
   * @param (number,string)
   * @returns (json)
   */
   deleteImageByUrl(id:any,imgUrl: any): Observable<any> {
    return this.http.delete(API_URL + 'deleteByUrl/'+id+'/'+imgUrl,{
      reportProgress: true,
      responseType: 'json'
    });
  }
  /**********************************************************************************/
  /**********************************************************************************/
  
}
