import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormBuilder,Validators } from '@angular/forms';
import Validation from 'src/app/utils/validation';
import { Router } from '@angular/router';
import { LeadsService } from 'src/app/services/leads.service';
import Swal from 'sweetalert2';
import { HttpParams,HttpEventType, HttpResponse } from '@angular/common/http';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {
  form:any = {
    auto_import_leads:null,
    auto_opt_leads:null,
  };
  constructor(private formBuilder: FormBuilder, private LeadsService: LeadsService, private router: Router,private calendar: NgbCalendar) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        auto_import_leads:['', [Validators.required]],
        auto_opt_leads:['', [Validators.required]]
  
      }
    )
  }

}
