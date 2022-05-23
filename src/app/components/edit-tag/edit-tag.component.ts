import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,RouterEvent, NavigationEnd,RoutesRecognized  } from '@angular/router';
import { AbstractControl,FormBuilder,Validators,FormGroup,FormControl} from '@angular/forms';
import { ContactsService } from 'src/app/services/contacts.service';
import { filter, pairwise } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-tag',
  templateUrl: './edit-tag.component.html',
  styleUrls: ['./edit-tag.component.css']
})
export class EditTagComponent implements OnInit {
  tagList:any[]=[];
  currentRout:any;
  currentId:any;
  previousUrl:string;
  id1:any;
  popoverTitle:string = 'Delete Tags';
popoverMessage:string = 'Are you sure you want to delete Tags?';
confirmClicked:boolean = true;
cancelClicked:boolean = true;


  editTagsForm: any = {
    tags: null,
  };
  errorMessages: string;
  errorMessage = '';
  submitted = false;
  constructor(private router: Router,private ContactsService: ContactsService,private formBuilder: FormBuilder,private route: ActivatedRoute) 
  {this.currentRout = router.url; }

  ngOnInit(): void {
    this.currentId = this.route.snapshot.params.id;
    this.id1 = this.route.snapshot.params.id1;
    this.showAllTags();
  
    // this.router.events
    // .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
    // .subscribe((events: RoutesRecognized[]) => {
    //   this.previousUrl = events[0].urlAfterRedirects;
    // });
  //   this.route.queryParams
  //   .subscribe(params => {
    
  //     console.log(params);
     
  //   }
  // );
   
    this.getTagById(this.route.snapshot.params.id);
    this.editTagsForm = this.formBuilder.group(
      {
        tags:['', [Validators.required]],
          
      }
    ) 
  }
  get f():{[key:string]:AbstractControl} {
    return this.editTagsForm.controls;
  }
  getTagById(id:number): void {
    this.ContactsService.getTagsById(id)
    .subscribe((data:any)=>{
     
  this.editTagsForm.setValue({
    tags: data.tags,  
  });
},
(error:any) => {
  console.log(error);
});
  }
 
  onSubmit(): void{
    const {
      tags,
      } = this.editTagsForm.value;
      this.submitted = true;
  if(this.editTagsForm.invalid) {
    return;
  }
    console.log(JSON.stringify(this.editTagsForm.value, null, 2));

  this.ContactsService.updateTags(
    this.route.snapshot.params.id,
    tags).subscribe(
    data => {
      console.log('data='+data.message);
      console.log('data='+data.status_code);
      if(data.status_code == 200) {
//         Swal.fire('Success!',data.message,'success');
         Swal.fire({
          icon: 'success',
          title: data.message,
          confirmButtonText: 'success',
          
        }).then((data) => {
          this.router.navigateByUrl('manage-tags');
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
showAllTags():void {
  this.ContactsService.getAllTags().subscribe((data)=>{
    console.log(data);
    this.tagList = data;
 });
}
deleteTags(id:number): void {
  this.ContactsService.deleteTags(id).subscribe(
    data => {
      console.log('data='+data.message);
      console.log('data='+data.status_code);
      this.showAllTags();
  
})
}
}
