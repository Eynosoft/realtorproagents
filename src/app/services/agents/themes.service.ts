import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { TokenStorageService } from '../token-storage.service';

const API_URL = environment.apiUrl + '/themes/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ThemesService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {}

  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * This check if login or not
   *
   * @param (null)
   * @returns (object)
   */
  get isLoggedIn() {
    if (!!this.tokenStorageService.getToken()) {
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
  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
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
   * Add new user themeinfo property
   *
   * @param (formdata)
   * @returns (json)
   */
  addthemesinfo(theme_id: any,userid:any): Observable<any> {

    const formData: FormData = new FormData();
    formData.append('theme_id', theme_id);
    formData.append('userid', userid);

    return this.http.post(API_URL + 'userthemes-info', formData, {
      reportProgress: true,
      responseType: 'json',
    });
  }
    /**********************************************************************************/
  /**********************************************************************************/
   /**
   * get theme userid  property
   *
   * @param (formdata)
   * @returns (json)
   */
    getThemesUserid(): Observable<any> {
   
      return this.http
        .get(API_URL + 'themes-userid')
        .pipe(catchError(this.errorHandler));
    }
     /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Add new selected theme pages property
   *
   * @param (formdata)
   * @returns (json)
   */
   themepageSelect(theme_id:any,
    userid:any,home:any,
    property_search_idx:any,
    about_us:any,
    testimonials:any,
    agents:any,
    blog:any,
    news_rss_feeds:any,
    preferred_lender:any,
    local_area:any,
    links:any,
    buyer_seller_tips:any,
    school_search:any,
    interest_rates:any,
    calculators:any,
    glossary_terms:any,
    moving_checklist:any,
    listings:any,
    homes_condos:any,
    lots_land:any,
    rentals:any,
    commercial:any,
    open_house:any,
    past_sales:any,
    contact_us:any,
    home_worth:any,
    email_property_alerts:any,
    home_value:any,
    home_request:any,
    rental_request:any,
    relocate:any,
    advanced_property_search:any,
    map_search:any,
    search_open_houses:any,
    property_alerts:any,
    property_organizer:any,
    communities:any,
    markets:any,
    featured_properties:any,
    sold_properties:any,
    rental_properties:any,
    commercial_properties:any,
    supplemental_properties:any,
    agents_b:any,
    office_b:any 
    ): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('theme_id', theme_id);
    formData.append('userid', userid);
    formData.append('home', home);
    formData.append('property_search_idx', property_search_idx);
    formData.append('about_us', about_us);
    formData.append('testimonials', testimonials);
    formData.append('agents', agents);
    formData.append('blog', blog);
    formData.append('news_rss_feeds', news_rss_feeds);
    formData.append('preferred_lender', preferred_lender);
    formData.append('local_area', local_area);
    formData.append('links', links);
    formData.append('buyer_seller_tips', buyer_seller_tips);
    formData.append('school_search', school_search);
    formData.append('interest_rates', interest_rates);
    formData.append('calculators', calculators);
    formData.append('glossary_terms', glossary_terms);
    formData.append('moving_checklist', moving_checklist);
    formData.append('listings', listings);
    formData.append('homes_condos', homes_condos);
    formData.append('lots_land', lots_land);
    formData.append('rentals', rentals);
    formData.append('commercial', commercial);
    formData.append('open_house', open_house);
    formData.append('past_sales', past_sales);
    formData.append('contact_us', contact_us);
    formData.append('home_worth', home_worth);
    formData.append('email_property_alerts', email_property_alerts);
    formData.append('home_value', home_value);
    formData.append('home_request', home_request);
    formData.append('rental_request', rental_request);
    formData.append('relocate', relocate);
    formData.append('advanced_property_search', advanced_property_search);
    formData.append('map_search', map_search);
    formData.append('search_open_houses', search_open_houses);
    formData.append('property_alerts', property_alerts);
    formData.append('property_organizer', property_organizer);
    formData.append('communities', communities);
    formData.append('markets', markets);
    formData.append('featured_properties', featured_properties);
    formData.append('sold_properties', sold_properties);
    formData.append('rental_properties', rental_properties);
    formData.append('commercial_properties', commercial_properties);
    formData.append('supplemental_properties', supplemental_properties);
    formData.append('agents_b', agents_b);
    formData.append('office_b', office_b);

    return this.http.post(API_URL + 'select-theme-page', formData, {
      reportProgress: true,
      responseType: 'json',
    });
  }
    /**********************************************************************************/
  /**********************************************************************************/
}
