import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormBuilder,Validators,FormGroup,FormArray,FormControl} from '@angular/forms';
import Validation from 'src/app/utils/validation';
import { ActivatedRoute,Router } from '@angular/router';
 import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userid: string[] = [];
  emailid: string;
  isLoggedIn = false;
  profileForm: any = {
    first_name: null,
    last_name: null,
    company_broker: null,
    address: null,
    city: null,
    state: null,
    zip: null,
    business_phone: null,
    cell_phone: null,
    fax: null,
    social_links: null,
    facebook: null,
    twitter: null,
    linkedin: null,
    youtube: null,
    instagram: null,
  };
  errorMessages: string;
  errorMessage = '';
  submitted = false;
  constructor(private formBuilder: FormBuilder, private router: Router,
    private route: ActivatedRoute,private ProfileService: ProfileService,private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.userid = this.tokenStorageService.getUser().userid;
    this.getProfileData(this.userid);
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.emailid = this.tokenStorageService.getUser().email;
      }
    this.profileForm = this.formBuilder.group(
      {
        first_name:['', [Validators.required]],
        last_name:['', [Validators.required]],
        company_broker: [''],
        address: [''],
        city: [''],
        state: [''],
        zip: [''],
        business_phone: [''],
        cell_phone: [''],
        fax: [''],
        social_links:[''],
        facebook:[''],
        twitter: [''],
        linkedin: [''],
        youtube: [''],
        instagram: ['']
      }
    ) 
   
  }
  get f():{[key:string]:AbstractControl} {
    return this.profileForm.controls;
  }
  getProfileData(userid:any): void {
    this.ProfileService.getAllprofile(userid)
    .subscribe((data:any)=>{
  console.log(data);  
 
  this.profileForm.setValue({
    first_name: data[0].first_name,
    last_name:data[0].last_name,
    company_broker: data[0].company_broker,
    address: data[0].address,
    city: data[0].city,
    state: data[0].state,
    zip: data[0].zip,
    business_phone: data[0].business_phone,
    cell_phone: data[0].cell_phone,
    fax: data[0].fax,
    social_links:data[0].social_links,
    facebook: data[0].facebook,
    twitter: data[0].twitter,
    linkedin: data[0].linkedin,
    youtube: data[0].youtube,
    instagram: data[0].instagram
   });
},
error => {
  console.log(error);
});
  }

  onSubmit(): void{

    const {
      first_name,
      last_name,
      company_broker,
      address,
      city,
      state,
      zip,
      business_phone,
      cell_phone,
      fax,
      social_links,
      facebook,
      twitter,
      linkedin,
      youtube,
      instagram
      
    } = this.profileForm.value;
    
    this.submitted = true;
    if(this.profileForm.invalid) {
      return;
    }
    
    console.log(JSON.stringify(this.profileForm.value, null, 2));

    this.ProfileService.addProfile(
      this.userid,
      first_name,
      last_name,
      company_broker,
      address,
      city,
      state,
      zip,
      business_phone,
      cell_phone,
      fax,
      social_links,
      facebook,
      twitter,
      linkedin,
      youtube,
      instagram
     ).subscribe(
      data => {
        console.log('data='+data.message);
        console.log('data='+data.status_code);
        console.log('data='+data.lastId);
        if(data.status_code == 200) {
          this.onReset();
          Swal.fire({
            icon: 'success',
            title: data.message,
            confirmButtonText: 'Save',
          });
           this.getProfileData(this.userid);
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
  onReset(): void {
    this.submitted = false;
    this.profileForm.reset();
   
  }

}
