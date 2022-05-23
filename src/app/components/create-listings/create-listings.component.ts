import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormBuilder,Validators } from '@angular/forms';
import Validation from 'src/app/utils/validation';
import { Router } from '@angular/router';
import { ListingsService } from 'src/app/services/listings.service';
import Swal from 'sweetalert2';
import { HttpParams,HttpEventType, HttpResponse } from '@angular/common/http';
import { ListingCategory } from 'src/app/interface/listing-category';
import {Listings} from 'src/app/interface/listings';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-listings',
  templateUrl: './create-listings.component.html',
  styleUrls: ['./create-listings.component.css']
})
export class CreateListingsComponent implements OnInit {
  selectedFiles?: FileList;
  selectedMainFile?: FileList;
  additionalFiles: string [] = [];
  mainFile: string [] = [];
  progressInfos: any[] = [];
  progressInfosMain: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  previewsmain: string[] = [];
  imageInfos?: Observable<any>;

  model: NgbDateStruct;
  model1: NgbDateStruct;
  date: {year: number, month: number};
  public listingCat: ListingCategory[] = [];
  public listings: Listings[] = [];

  returnData: any;
  value = '';
  form: any = {
    mls: null,
    address: null,
    city: null,
    state: null,
    zip: null,
    listings: null,
    category_name:null,
    title: null,
    description: null,
    price: null,
    year_built: null,
    square_feet: null,
    main_image: null,
    additional_image:null,
    bedrooms: null,
    bathrooms: null,
    virtual_tour_url: null,
    featured_listing: null,
    sold_home: null,
    open_house_start_date: null,
    open_house_end_date: null,
    widget_code: null,
    google_map: null,
    zillow: null,
    syndicate_listing: null,
    sort_order: null
    
  };
  formListing: any = {
    listings: null
  }
  errorMessages: string;
  errorMessage = '';
  submitted = false;
  constructor(private formBuilder: FormBuilder, private listingService: ListingsService, private router: Router,private calendar: NgbCalendar, private uploadService: FileUploadService) { }
  selectToday() {
    this.model = this.calendar.getToday();
    this.model1 = this.calendar.getToday();
  }
  ngOnInit(): void {
    
    //console.log(this.listingCat); 
    this.form = this.formBuilder.group(
      {
        mls:['', [Validators.required]],
        title:['', [Validators.required]],
        address: [''],
        city: [''],
        state: [''],
        zip: [''],
        description: [''],
        price: [''],
        year_built: [''],
        square_feet: [''],
        category_name:[''],
        listings:[''],
        bedrooms: [''],
        bathrooms: [''],
        main_image: [''],
        additional_image: [''],
        virtual_tour_url: [''],
        featured_listing: [''],
        sold_home: [''],
        open_house_start_date: [''],
        open_house_end_date: [''],
        widget_code: [''],
        google_map: [''],
        zillow: [''],
        syndicate_listing: [''],
        sort_order: [''],
      }
    )
    this.formListing = this.formBuilder.group({
      listings: ['']
    }) 
    this.listingService.getListingCategory().subscribe((dataListCat: ListingCategory[])=>{
      
      this.listingCat = dataListCat;
      //console.log(this.listingCat);
      //console.log('this is the category list ' + this.listingCat); 
    })
    
    this.listingService.getListings().subscribe((dataList: Listings[]) => {
      if(dataList.length >0) {
        this.listings = dataList;
      } 
      //console.log('this is the listings == ' + this.listings);
    });
    
  }

  get f():{[key:string]:AbstractControl} {
    return this.form.controls;
  }
  get flist():{[key:string]:AbstractControl} {
    return this.formListing.controls;
  }
  onSubmitListing(): void {
    //console.log(this.formListing.value);
  }
  editListing(): void {
    const {
      listings
    } = this.formListing.value;
    console.log('listings='+listings);
    this.router.navigateByUrl('/edit-listings/'+listings);
  }
  newListing(): void {
    this.router.navigateByUrl('/create-listings');
  }
  deleteListing(): void {
    const {
      listings
    } = this.formListing.value;
    this.listingService.deleteListing(listings
      ).subscribe(
      data => {
        console.log('data='+data.message);
        console.log('data='+data.status_code);
        if(data.status_code == 200) {
          Swal.fire('Success!',data.message,'success');
          this.onReset();
          
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.message
          })
        }
        
        //Swal.fire('Success!', 'Listing Added Successfully.!', 'success');
        
      },
      err => {
        console.log('err='+err);
        this.errorMessage = err.error.message;
        
      }
    )
  }
  onSubmit(): void{
    const {
      mls,
      address,
      city,
      state,
      zip,
      title,
      description,
      price,
      year_built,
      square_feet,
      bedrooms,
      bathrooms,
      category_name,
      main_image,
      additional_image,
      
      virtual_tour_url,
      featured_listing,
      sold_home,
      open_house_start_date,
      open_house_end_date,
      widget_code,
      google_map,
      zillow,
      syndicate_listing,
      sort_order
    } = this.form.value;
    
    this.submitted = true;
    if(this.form.invalid) {
      return;
    }
    
    console.log(JSON.stringify(this.form.value, null, 2));
    this.listingService.addListing(mls,
      address,
      city,
      state,
      zip,
      title,
      description,
      price,
      main_image,
      additional_image,
      this.mainFile,
      this.additionalFiles,
      //this.selectedMainFile,
      //this.selectedFiles,
      category_name,
      year_built,
      square_feet,
      bedrooms,
      bathrooms,
      virtual_tour_url,
      featured_listing,
      sold_home,
      open_house_start_date,
      open_house_end_date,
      widget_code,
      google_map,
      zillow,
      syndicate_listing,
      sort_order).subscribe(
      data => {
        console.log('data='+data.message);
        console.log('data='+data.status_code);
        if(data.status_code == 200) {
          Swal.fire('Success!',data.message,'success');
          this.onReset();
          
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.message
          })
        }
        
        //Swal.fire('Success!', 'Listing Added Successfully.!', 'success');
        
      },
      err => {
        console.log('err='+err);
        this.errorMessage = err.error.message;
        
      }
    )
  }
  selectFiles(event: any): void {
    this.additionalFiles = [];
  
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    
    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        this.additionalFiles.push(event.target.files[i]);
        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };
  
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }
  selectMainFile(event: any): void {
    this.mainFile = [];
    this.message = [];
    this.progressInfosMain = [];
    this.selectedMainFile = event.target.files;
  
    this.previewsmain = [];
    if (this.selectedMainFile && this.selectedMainFile[0]) {
      const numberOfFiles = this.selectedMainFile.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        this.mainFile.push(event.target.files[i]);
        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previewsmain.push(e.target.result);
        };
  
        reader.readAsDataURL(this.selectedMainFile[i]);
      }
    }
  }
  uploadFiles(): void {
    this.message = [];
  
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }
  
  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
  
    if (file) {
      this.uploadService.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            this.imageInfos = this.uploadService.getFiles();
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
        });
    }
  }
  
  
  onReset(): void {
    this.submitted = false;
    this.form.reset();
    this.formListing.reset();
    this.listingService.getListings().subscribe((dataList: Listings[]) => {
      this.listings = dataList;
      console.log('this is the listings == ' + this.listings);
    });
  }
  
}
