import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ContactsService } from 'src/app/services/contacts.service';
import { HttpParams,HttpEventType, HttpResponse } from '@angular/common/http';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-contacts-details',
  templateUrl: './contacts-details.component.html',
  styleUrls: ['./contacts-details.component.css']
})
export class ContactsDetailsComponent implements OnInit {
  contactDetails:any;
  ContactTaskDetails:any;
  tagsList:any;
  popoverTitle:string = 'Delete Task';
  popoverMessage:string = 'Are you sure you want to delete task?';
  confirmClicked:boolean = true;
  cancelClicked:boolean = true;
  stars:number[]=[1,2,3,4,5];
  
  constructor( private ContactsService: ContactsService, private router: Router,private route: ActivatedRoute,private TaskService: TaskService) {
    // console.warn(this.date);
    //  this.ContactsService.setDate(this.date);
    
     
  }
  
  ngOnInit(): void {

    this.getContactDataById(this.route.snapshot.params.id);
    this.showAllTags();
}

getContactDataById(id:number): void {
  if(id){
  this.ContactsService.getContactsById(id).subscribe((result:any)=>{
  this.contactDetails=result.result;
  this.ContactTaskDetails = result.contactTask;

  console.log(this.contactDetails);
       // this.date = result.created_at;
});
  }
}
    /******************************************************************************/
    /******************************************************************************/
      // show  all tags by id 
showAllTags(): void {
  this.ContactsService.getAllTagsByContactId(this.route.snapshot.params.id).subscribe((data)=>{
  console.log(data);
    this.tagsList = data;
   
 });
}
     /******************************************************************************/
    /******************************************************************************/
      // delete all task by id 
deleteTask(id:number): void{
  this.TaskService.deleteTaskList(id).subscribe(
    data => {
      console.log('data='+data.message);
      console.log('data='+data.status_code);
      if(data.status_code == 200) {      
    this.getContactDataById(this.route.snapshot.params.id);
        Swal.fire('Success!',data.message,'success');
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
