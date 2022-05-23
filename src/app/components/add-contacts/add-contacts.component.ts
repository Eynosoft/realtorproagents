
import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormBuilder,Validators,FormGroup,FormArray,FormControl} from '@angular/forms';
import Validation from 'src/app/utils/validation';
import { ActivatedRoute,Router } from '@angular/router';
import { ContactsService } from 'src/app/services/contacts.service';
import Swal from 'sweetalert2';
import { HttpParams,HttpEventType, HttpResponse } from '@angular/common/http';
import {Contacts} from 'src/app/interface/contacts';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-contacts',
  templateUrl: './add-contacts.component.html',
  styleUrls: ['./add-contacts.component.css']
})
export class AddContactsComponent implements OnInit {
  tags:any;
  public contacts: Contacts[] = [];
  contactForm: any = {
    first_name: null,
    last_name: null,
    company: null,
    address1: null,
    address2: null,
    city: null,
    state: null,
    zip: null,
    home_phone: null,
    work_phone: null,
    mobile_phone: null,
    fax: null,
    email: null,
    email2: null,
    birthday: null,
    stars: null,
    tags: null,
    contact_name2: null,
    contact_phone2: null,
    contact_email2: null,
    contact_birthday2: null
  };
  errorMessages: string;
  errorMessage = '';
  submitted = false;
  constructor(private formBuilder: FormBuilder, private ContactsService: ContactsService, private router: Router,
    private route: ActivatedRoute,private calendar: NgbCalendar) { }

  ngOnInit(): void {
    this.showAllTags();
    this.contactForm = this.formBuilder.group(
      {
        first_name:['', [Validators.required]],
        last_name:['', [Validators.required]],
        company: [''],
        address1: [''],
        address2: [''],
        city: [''],
        state: [''],
        zip: [''],
        home_phone: [''],
        work_phone: [''],
        mobile_phone:[''],
        fax:[''],
        email: [''],
        email2: [''],
        birthday: [''],
        stars: [''],
        tags: this.formBuilder.array([]),
        contact_name2: [''],
        contact_phone2: [''],
        contact_email2: [''],
        contact_birthday2: ['']
      }
    ) 
  }

 
  get f():{[key:string]:AbstractControl} {
    return this.contactForm.controls;
  }
  onCheckboxChange(e:any) {
    const tags: FormArray = this.contactForm.get('tags') as FormArray;
   
    if (e.target.checked) {
      tags.push(new FormControl(e.target.value));
    } else {
       const index = tags.controls.findIndex(x => x.value === e.target.value);
       tags.removeAt(index);
    }
  }
  onSubmit(): void{

    const {
      first_name,
      last_name,
      company,
      address1,
      address2,
      city,
      state,
      zip,
      home_phone,
      work_phone,
      mobile_phone,
      fax,
      email,
      email2,
      birthday,
      stars,
      tags,
      contact_name2,
      contact_phone2,
      contact_email2,
      contact_birthday2
      
    } = this.contactForm.value;
    
    this.submitted = true;
    if(this.contactForm.invalid) {
      return;
    }
    
    console.log(JSON.stringify(this.contactForm.value, null, 2));

    this.ContactsService.addContacts(
      first_name,
      last_name,
      company,
      address1,
      address2,
      city,
      state,
      zip,
      home_phone,
      work_phone,
      mobile_phone,
      fax,
      email,
      email2,
      birthday,
      stars,
      tags,
      contact_name2,
      contact_phone2,
      contact_email2,
      contact_birthday2).subscribe(
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
             this.router.navigateByUrl('contacts-details/'+data.lastId);
         
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
  showAllTags(): void {
    this.ContactsService.getAllTags().subscribe((data)=>{
      
      this.tags = data;
   });
  }
  onReset(): void {
    this.submitted = false;
    this.contactForm.reset();
   
  }
}

