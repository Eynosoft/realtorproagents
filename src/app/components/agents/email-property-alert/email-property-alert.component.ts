import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormBuilder,Validators,FormGroup,FormArray,FormControl} from '@angular/forms';
import Validation from 'src/app/utils/validation';
import { ActivatedRoute,Router } from '@angular/router';
import { EmailAlertService } from 'src/app/services/agents/email-alert.service';
import Swal from 'sweetalert2';
import {Contacts} from 'src/app/interface/contacts';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-email-property-alert',
  templateUrl: './email-property-alert.component.html',
  styleUrls: ['./email-property-alert.component.css']
})
export class EmailPropertyAlertComponent implements OnInit {
  emailAlertForm: any = {
    location: null,
    property_type: null,
    min_price: null,
    max_price: null,
    beds: null,
    baths: null,
    feature: null,
    name: null,
    email: null,
    phone: null
  };
  errorMessages: string;
  errorMessage = '';
  submitted = false;
  constructor(private formBuilder: FormBuilder, private EmailAlertService: EmailAlertService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.emailAlertForm = this.formBuilder.group(
      {
        location:['', [Validators.required]],
        property_type:['', [Validators.required]],
        min_price: [''],
        max_price: [''],
        beds: [''],
        baths: [''],
        feature: [''],
        name: [''],
        email: [''],
        phone: [''],
      }
    ) 
  }
  get f():{[key:string]:AbstractControl} {
    return this.emailAlertForm.controls;
  }
  onSubmit(): void{
    
    const {
      location,
      property_type,
      min_price,
      max_price,
      beds,
      baths,
      feature,
      name,
      email,
      phone   
    } = this.emailAlertForm.value;
    
    this.submitted = true;
    if(this.emailAlertForm.invalid) {
      return;
    }
    
    console.log(JSON.stringify(this.emailAlertForm.value, null, 2));

    this.EmailAlertService.addEmailAlert(
      location,
      property_type,
      min_price,
      max_price,
      beds,
      baths,
      feature,
      name,
      email,
      phone).subscribe(
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
            //  this.router.navigateByUrl('contacts-details/'+data.lastId);
         
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
  onReset(): void {
    this.submitted = false;
    this.emailAlertForm.reset();
   }
}
