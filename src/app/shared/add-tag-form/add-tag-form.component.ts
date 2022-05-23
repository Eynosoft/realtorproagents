import { Component, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';
import { AbstractControl,FormBuilder,Validators,FormGroup,FormControl} from '@angular/forms';
import Validation from 'src/app/utils/validation';
import { ActivatedRoute,Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-tag-form',
  templateUrl: './add-tag-form.component.html',
  styleUrls: ['./add-tag-form.component.css']
})
export class AddTagFormComponent implements OnInit {
  tagList:any[]=[];
  contactTagsForm: any = {
    tags: null,
  };
  errorMessages: string;
  errorMessage = '';
  submitted = false;
  popoverTitle:string = 'Delete Tags';
  popoverMessage:string = 'Are you sure you want to delete Tag?';
  confirmClicked:boolean = true;
  cancelClicked:boolean = true;
  constructor(private router: Router,private ContactsService: ContactsService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.showAllTags();
    this.contactTagsForm = this.formBuilder.group(
      {
        tags:['', [Validators.required]],
    
      }); 
  }
  get f():{[key:string]:AbstractControl} {
    return this.contactTagsForm.controls;
  }
  onSubmit(): void{
    const {
      tags,
      
    } = this.contactTagsForm.value;
    
    this.submitted = true;
    if(this.contactTagsForm.invalid) {
      return;
    }
    console.log(JSON.stringify(this.contactTagsForm.value, null, 2));
    this.ContactsService.addContactsTags(
      tags,
     ).subscribe(
      data => {
        console.log('data='+data.message);
        console.log('data='+data.status_code);
        console.log('data='+data.lastId);
        this.router.navigateByUrl('manage-tags');
        this.showAllTags();
   });
  }
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
