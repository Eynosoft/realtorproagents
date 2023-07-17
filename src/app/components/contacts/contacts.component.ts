
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AbstractControl,FormBuilder,Validators } from '@angular/forms';
import { ContactsService } from 'src/app/services/contacts.service';
import { HttpParams,HttpEventType, HttpResponse } from '@angular/common/http';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

 contactData:any;
 totalCount:number;
 totalTags:any;
 searchText:any;
 searchAlpha:any;
 letter:any;
 country:any;
 popoverTitle:string = 'Delete Contacts';
 popoverMessage:string = 'Are you sure you want to delete contact?';
 confirmClicked:boolean = true;
 cancelClicked:boolean = true;
  constructor(private formBuilder: FormBuilder, private ContactsService: ContactsService, private router: Router,
             private calendar: NgbCalendar)  { }
  ngOnInit(): void {
    this.getContactData();
 }
  getContactData(): void {
   
    this.ContactsService.getContacts().subscribe((data)=>{
      //console.log(data);
      console.log(data.contacts);
      this.contactData = data.contacts;
      this.totalCount = data.count;
      //for(let item of this.contactData){
      //  console.log(item);
      //}
  });

}

// get all tags that associated in contacts------------------------------------
// getContactsTagData(): void {
//   this.ContactsService.getContactsTags().subscribe((data)=>{
//     this.totalTags = data;
  

//   });
// }

Search(letters:any): void {
   
  //this.searchAlpha = event.target.value;
    if(letters)
    {
       this.ContactsService.searchByAlphabet(letters).subscribe((data)=>{
        console.log(data);
        //console.log(data.contacts);
        this.contactData = data.contacts;
        this.totalCount = data.count;
        
    });  
      
     }
     
  
}

deleteContact(id:number): void{
  this.ContactsService.deleteContact(id).subscribe(
    data => {
      console.log('data='+data.message);
      console.log('data='+data.status_code);
      if(data.status_code == 200) {
        Swal.fire('Success!',data.message,'success');
        this.getContactData();
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
    }
  )
}

}
