import { Component, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';
import { AbstractControl,FormBuilder,Validators,FormGroup,FormControl} from '@angular/forms';
import Validation from 'src/app/utils/validation';
import { ActivatedRoute,Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-new-tag',
  templateUrl: './add-new-tag.component.html',
  styleUrls: ['./add-new-tag.component.css']
})
export class AddNewTagComponent implements OnInit {
  tagList:any[]=[];
   contactTagsForm: any = {
    tags: null,
  };
  errorMessages: string;
  errorMessage = '';
  submitted = false;
  popoverTitle:string = 'Delete Tags';
  popoverMessage:string = 'Are you sure you want to delete Tag? If this tag is associated with any contact, the tag will be removed.';
  confirmClicked:boolean = true;
  cancelClicked:boolean = true;
  constructor(private router: Router,private ContactsService: ContactsService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // this.ContactsService.setTags(this.tagList);
    // this.ContactsService.getTags();
    this.showAllTags();
    this.contactTagsForm = this.formBuilder.group(
      {
        tags:['', [Validators.required]],
     }); 
  }
  get f():{[key:string]:AbstractControl} {
    return this.contactTagsForm.controls;
  }
//   addTags(){
//     if (this.newTag == '') {

//     }
//     else {
//         this.tagList.push(this.newTag);
//         this.newTag = '';
//     }
//   }
//   deleteTag(index:number) {
 
//     this.tagList.splice(index, 1);
//     // this.tagList = this.tagList.filter(item=>item.index!==index);
//     // this.router.navigateByUrl('/manage-tag');
   
// }
// onSubmit(): void{
//   const {
//     tags,
    
//   } = this.contactTagsForm.value;
  
//   this.submitted = true;
//   if(this.contactTagsForm.invalid) {
//     return;
//   }
//   console.log(JSON.stringify(this.contactTagsForm.value, null, 2));
//   this.ContactsService.addContactsTags(
//     tags,
//    ).subscribe(
//     data => {
//       console.log('data='+data.message);
//       console.log('data='+data.status_code);
//       console.log('data='+data.lastId);
//       this.showAllTags();
//  });
// }
showAllTags(): void {
  this.ContactsService.getAllTags().subscribe((data)=>{
    console.log(data);
    this.tagList = data;
 });
}

deleteTags(id:number): void{
  this.ContactsService.deleteTags(id).subscribe(
    data => {
      console.log('data='+data.message);
      console.log('data='+data.status_code);
      this.showAllTags();
})
}
}
