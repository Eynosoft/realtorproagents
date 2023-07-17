import { Component, OnInit } from '@angular/core';
import { ThemesService } from 'src/app/services/agents/themes.service';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from '../../../services/token-storage.service';
import {
  AbstractControl,
  FormBuilder,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-select-theme-page',
  templateUrl: './select-theme-page.component.html',
  styleUrls: ['./select-theme-page.component.css']
})
export class SelectThemePageComponent implements OnInit {
  userid: string[] = [];
  theme_id:any;
  isLoggedIn = false;
  themePageSelectForm: any = {
    //theme_page: null,
    home:null,
    property_search_idx:null,
    about_us:null,
    testimonials:null,
     agents:null,
     blog:null,
     news_rss_feeds:null,
     preferred_lender:null,
     local_area:null,
     links:null,
     buyer_seller_tips:null,
     school_search:null,
     interest_rates:null,
     calculators:null,
     glossary_terms:null,
     moving_checklist:null,
     listings:null,
     homes_condos:null,
     lots_land:null,
     rentals:null,
     commercial:null,
     open_house:null,
     past_sales:null,
     contact_us:null,
     home_worth:null,
     email_property_alerts:null,
     home_value:null,
     home_request:null,
     rental_request:null,
     relocate:null,
     advanced_property_search:null,
     map_search:null,
     search_open_houses:null,
     property_alerts:null,
     property_organizer:null,
     communities:null,
     markets:null,
     featured_properties:null,
     sold_properties:null,
     rental_properties:null,
     commercial_properties:null,
     supplemental_properties:null,
     agents_b:null,
     office_b:null
  };
  errorMessages: string;
  errorMessage = '';
  submitted = false;
  constructor(    private http: HttpClient,
    private formBuilder: FormBuilder,
    private ThemesService: ThemesService,private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.userid = this.tokenStorageService.getUser().userid;
      }
    this.themePageSelectForm = this.formBuilder.group({
 
     //theme_page: this.formBuilder.array([]),
     home:[''],
     property_search_idx:[''],
     about_us:[''],
     testimonials:[''],
     agents:[''],
     blog:[''],
     news_rss_feeds:[''],
     preferred_lender:[''],
     local_area:[''],
     links:[''],
     buyer_seller_tips:[''],
     school_search:[''],
     interest_rates:[''],
     calculators:[''],
     glossary_terms:[''],
     moving_checklist:[''],
     listings:[''],
     homes_condos:[''],
     lots_land:[''],
     rentals:[''],
     commercial:[''],
     open_house:[''],
     past_sales:[''],
     contact_us:[''],
     home_worth:[''],
     email_property_alerts:[''],
     home_value:[''],
     home_request:[''],
     rental_request:[''],
     relocate:[''],
     advanced_property_search:[''],
     map_search:[''],
     search_open_houses:[''],
     property_alerts:[''],
     property_organizer:[''],
     communities:[''],
     markets:[''],
     featured_properties:[''],
     sold_properties:[''],
     rental_properties:[''],
     commercial_properties:[''],
     supplemental_properties:[''],
     agents_b:[''],
     office_b:['']
    });
    this.getUserThemeId();
  }

  onSubmit(): void {
    const {
      home,
    property_search_idx,
    about_us,
    testimonials,
     agents,
     blog,
     news_rss_feeds,
     preferred_lender,
     local_area,
     links,
     buyer_seller_tips,
     school_search,
     interest_rates,
     calculators,
     glossary_terms,
     moving_checklist,
     listings,
     homes_condos,
     lots_land,
     rentals,
     commercial,
     open_house,
     past_sales,
     contact_us,
     home_worth,
     email_property_alerts,
     home_value,
     home_request,
     rental_request,
     relocate,
     advanced_property_search,
     map_search,
     search_open_houses,
     property_alerts,
     property_organizer,
     communities,
     markets,
     featured_properties,
     sold_properties,
     rental_properties,
     commercial_properties,
     supplemental_properties,
     agents_b,
     office_b
     } = this.themePageSelectForm.value;

    this.submitted = true;
    if (this.themePageSelectForm.invalid) {
      return;
    }
    console.log(this.themePageSelectForm.value);

      this.ThemesService. themepageSelect( 
        this.theme_id,
        this.userid,
        home,
        property_search_idx,
        about_us,
        testimonials,
        agents,
        blog,
        news_rss_feeds,
        preferred_lender,
        local_area,
        links,
        buyer_seller_tips,
        school_search,
        interest_rates,
        calculators,
        glossary_terms,
        moving_checklist,
        listings,
        homes_condos,
        lots_land,
        rentals,
        commercial,
        open_house,
        past_sales,
        contact_us,
        home_worth,
        email_property_alerts,
        home_value,
        home_request,
        rental_request,
        relocate,
        advanced_property_search,
        map_search,
        search_open_houses,
        property_alerts,
        property_organizer,
        communities,
        markets,
        featured_properties,
        sold_properties,
        rental_properties,
        commercial_properties,
        supplemental_properties,
        agents_b,
        office_b ).subscribe(
        data => {
          console.log('data='+data.message);
          console.log('data='+data.status_code);
          console.log('data='+data.lastId);
          if(data.status_code == 200) {
            Swal.fire({
              icon: 'success',
              title: data.message,
              confirmButtonText: 'Save',
               });
             } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data.message
            })
          }
        },
        err => {
          console.log('err='+err);
          this.errorMessage = err.error.message;
          
        }
       )
  }
  getUserThemeId(): void {
   
    this.ThemesService.getThemesUserid().subscribe((data)=>{
      console.log(data);

    this.theme_id = data[0].id;
    });
}
}
