import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormBuilder,Validators,FormGroup,FormArray,FormControl } from '@angular/forms';
import Validation from 'src/app/utils/validation';
import { ActivatedRoute,Router } from '@angular/router';
import { ContactsService } from 'src/app/services/contacts.service';
import Swal from 'sweetalert2';
import { HttpParams,HttpEventType, HttpResponse } from '@angular/common/http';
import {Contacts} from 'src/app/interface/contacts';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-contacts',
  templateUrl: './edit-contacts.component.html',
  styleUrls: ['./edit-contacts.component.css']
})
export class EditContactsComponent implements OnInit {
   id:any;
   tagsList:any;
  tagsData:any[]=[];
  public contacts: Contacts[] = [];
  editContactForm: any = {
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
  constructor(private formBuilder: FormBuilder, private ContactsService: ContactsService, 
    private router: Router,private route: ActivatedRoute) 
    { }

  ngOnInit(): void {
    this.showAllTags();
    this.getContactDataById(this.route.snapshot.params.id);
    
    this.id = this.route.snapshot.params.id;
   
    this.editContactForm = this.formBuilder.group(
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
       //tags: this.formBuilder.array([]),
        tags:[''],
        contact_name2: [''],
        contact_phone2: [''],
        contact_email2: [''], 
        contact_birthday2: [''],
    }
    )
  }
  get f():{[key:string]:AbstractControl} {
    return this.editContactForm.controls;
  }
  getContactDataById(id:number): void {
    this.ContactsService.getContactsById(id)
    .subscribe((data:any)=>{
    this.tagsData = data.result.tagsid;
console.warn(this.tagsData);
      
      //setTimeout(() => {
  this.editContactForm.setValue({
    first_name: data.result.first_name,
    last_name:data.result.last_name,
    company: data.result.company,
    address1: data.result.address1,
    address2: data.result.address2,
    city: data.result.city,
    state: data.result.state,
    zip: data.result.zip,
    home_phone: data.result.home_phone,
    work_phone: data.result.work_phone,
    mobile_phone:data.result.mobile_phone,
    fax: data.result.fax,
    email: data.result.email,
    email2: data.result.email2,
    birthday: data.result.birthday,
    stars: data.result.stars,

    contact_name2: data.result.contact_name2,
    contact_phone2: data.result.contact_phone2,
    contact_email2: data.result.contact_email2,
    contact_birthday2: data.result.contact_birthday2,
     tags: data.result.tagsid,
   });
   //}, );

},
error => {
  console.log(error);
});
  }

  onCheckboxChange(e:any) {

    //const tags: FormArray = this.editContactForm.get('tags') as FormArray;
    //const tags = (this.editContactForm.controls.tags as FormArray);

    if (e.target.checked) {
      this.tagsData.push(e.target.value);
    } else {
      const index = this.tagsData.indexOf((x:any) => x.value === e.target.value);
       this.tagsData.splice(index,1);
    }
  }
  
  // submit form data onclick--------------------------------------------
onsubmit(): void{
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
        
      } = this.editContactForm.value;
        this.submitted = true;
    if(this.editContactForm.invalid) {
      return;
    }
      console.log(JSON.stringify(this.editContactForm.value, null, 2));
         console.warn(this.tagsData);
    this.ContactsService.updateContacts(
      this.route.snapshot.params.id,
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
      this.tagsData,
      contact_name2,
      contact_phone2,
      contact_email2,
      contact_birthday2)
      .subscribe(
      data => {
        console.log('data='+data.message);
        console.log('data='+data.status_code);
        if(data.status_code == 200) {
  //         Swal.fire('Success!',data.message,'success');
           this.onReset();
        
           Swal.fire({
            icon: 'success',
            title: data.message,
            confirmButtonText: 'success',
            
          }).then((data) => {
            this.router.navigateByUrl('contacts-details/'+ this.route.snapshot.params.id);
          })
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

showAllTags(): void {
  this.ContactsService.getAllTagsByContactId(this.route.snapshot.params.id).subscribe((data)=>{
  console.log(data);
    this.tagsList = data;   
 });
}

  onReset(): void {
    this.submitted = false;
    this.editContactForm.reset();
   }
}



