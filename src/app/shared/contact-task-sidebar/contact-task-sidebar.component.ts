
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,NavigationEnd,Router } from '@angular/router';
import { ContactsService } from 'src/app/services/contacts.service';
import { TaskService } from 'src/app/services/task.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-task-sidebar',
  templateUrl: './contact-task-sidebar.component.html',
  styleUrls: ['./contact-task-sidebar.component.css']
})
export class ContactTaskSidebarComponent implements OnInit {
btnTitle="View All Contacts";
totalContacts:number;
createDate:any;
totalTags:any[]=[];
taskCount:any;
tagsLength:any
currentRout:any;
currentRoutId:any;
popoverTitle:string = 'Delete Contacts';
popoverMessage:string = 'Are you sure you want to delete contact?';
confirmClicked:boolean = true;
cancelClicked:boolean = true;
  constructor(private router: Router,private ContactsService: ContactsService,private TaskService: TaskService,private route: ActivatedRoute) {
    this.currentRout = router.url;
   }

  ngOnInit(): void {
    this.currentRoutId = this.route.snapshot.params.id;
  
    this.getContactsData();
    this.showAllTags();
    this.getAllTaskList();
    this.getContactsTagData();
    this.getContactsDataById(this.route.snapshot.params.id);
    
    //  this.createDate = this.ContactsService.getDate();
    }
   
    getContactsData(): void {
      this.ContactsService.getContacts().subscribe((data)=>{
       
        this.totalContacts = data.count;
        // let tagsArray = [];
        //   for(let i=0; i<this.totalContacts; i++){
           
        //     tagsArray.push(data.contacts[i].tags.split(",")); 
       
        // }
        //  tagsArray = tagsArray.reduce(function(prev, next) {
        //   return prev.concat(next);
        // });
        // this.totalTags = [...new Set(tagsArray)];
      });
  }
  
// get all tags that associated in contacts------------------------------------
  getContactsTagData(): void {
    this.ContactsService.getContactsTags().subscribe((data)=>{
      this.totalTags = data;
    });
  }

   showAllTags():void {
    this.ContactsService.getAllTags().subscribe((data)=>{
 
      this.tagsLength = data.length;
   });
  }

  getContactsDataById(id:number): void {
  if(this.route.snapshot.params.id){
    this.ContactsService.getContactsById(id).subscribe((result:any)=>{
      this.createDate = result.result.created_at;
  });
}
  }
  
  deleteContact(id:number): void{
    this.ContactsService.deleteContact(id).subscribe(
      data => {
        console.log('data='+data.message);
        console.log('data='+data.status_code);
        if(data.status_code == 200) {
          Swal.fire('Delete Success!',data.message,'success');
          this.router.navigateByUrl('/view-all-contacts');
   
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
       /******************************************************************************/
	/******************************************************************************/
    // show all task list 
    getAllTaskList(): void {
      this.TaskService.getAllTask().subscribe((data)=>{

        this.taskCount = data.task.length;

    });
  }
}
