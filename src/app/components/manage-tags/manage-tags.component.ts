import { Component, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';
@Component({
  selector: 'app-manage-tags',
  templateUrl: './manage-tags.component.html',
  styleUrls: ['./manage-tags.component.css']
})
export class ManageTagsComponent implements OnInit {
tags:any
popoverTitle:string = 'Delete Tags';
popoverMessage:string = 'Are you sure you want to delete Tags? If this tag is associated with any contact, the tag will be removed.';
confirmClicked:boolean = true;
cancelClicked:boolean = true;
  constructor(private ContactsService: ContactsService) { }

  ngOnInit(): void {
    this.showAllTags();
  
  }
  deleteTags(id:number): void {
    this.ContactsService.deleteTags(id).subscribe(
      data => {
        console.log('data='+data.message);
        console.log('data='+data.status_code);
        this.showAllTags();
    
  })
  }
showAllTags():void {
  this.ContactsService.getAllTags().subscribe((data)=>{
    console.log(data);
    this.tags = data;
 });
}
}
