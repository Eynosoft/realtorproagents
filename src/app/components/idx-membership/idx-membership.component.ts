import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder,Validators, FormGroup,FormArray,FormControl } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router'; 
import { Router } from '@angular/router';
import { MlsService } from 'src/app/services/mls/mls.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-idx-membership',
  templateUrl: './idx-membership.component.html',
  styleUrls: ['./idx-membership.component.css']
})
export class IdxMembershipComponent implements OnInit {
  mlsData: any;
  membershipForm: any = {
   membershipname: null,
   mls: null 
  }

  //errorMessages: string;
  //errorMessage = '';
  submitted = false;
  
  /**
   * returns the form control 
   */
  get f():{[key:string]:AbstractControl} {
    return this.membershipForm.controls;
  }
  /******************************************************************************/
	/******************************************************************************/

  /**
   * Constructor initializes the method and instances
   * 
   * @param formBuilder 
   * @param mlsService 
   * @param router 
   * @param route 
   */
  constructor(private formBuilder: FormBuilder, private mlsService: MlsService, private router: Router,
    private route: ActivatedRoute) { }
  /******************************************************************************/
	/******************************************************************************/  
  /**
   * Function and variables are called or initialized
   */ 
  ngOnInit(): void {
    
    this.getAllMls();
    this.membershipForm = this.formBuilder.group(
      {
        membershipname:['',[Validators.required]],
        mls:['',[Validators.required]]
      }
    )
  }
  /******************************************************************************/
	/******************************************************************************/
  
  /**
   * Get all the mls data from the database
   */
  getAllMls(): void {
    this.mlsService.getMls().subscribe((data)=>{
      this.mlsData = data;
      console.log(data);
   });
  }
  /******************************************************************************/
	/******************************************************************************/

  /**
   * Submit the form data
   */
   onSubmit(): void {
    const {membershipname,mls} = this.membershipForm.value;
    this.submitted = true;
    if(this.membershipForm.invalid) {
      return;
    }
    localStorage.removeItem('membershipname');
    localStorage.removeItem('mls');
    localStorage.setItem('membershipname', membershipname);
    localStorage.setItem('mls', mls);
    this.router.navigateByUrl('/idx-payment');
    //console.log(this.formListing.value);
  }
  /******************************************************************************/
	/******************************************************************************/
  
}
