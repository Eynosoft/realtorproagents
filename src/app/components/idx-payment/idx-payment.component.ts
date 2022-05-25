import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder,Validators, FormGroup,FormArray,FormControl } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-idx-payment',
  templateUrl: './idx-payment.component.html',
  styleUrls: ['./idx-payment.component.css']
})
export class IdxPaymentComponent implements OnInit {
  payentData: any;
  membershipname:any;
  mls: any;
  paymentForm: any = {
    duration: null,
    ultra_agent_social: null,
    cardnumber: null,
    securitycode: null,
    expiry_date: null,
    expiry_year: null,
    first_name: null,
    last_name: null,
    adresss: null,
    city: null,
    state: null,
    zip: null
  }

  submitted = false;
  /**
   * returns the form control 
   */
   get f():{[key:string]:AbstractControl} {
    return this.paymentForm.controls;
  }
  /******************************************************************************/
	/******************************************************************************/
  constructor(private formBuilder: FormBuilder, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.membershipname = localStorage.getItem('membershipname');
    this.mls = localStorage.getItem('mls');
    
    this.paymentForm = this.formBuilder.group(
      {
        duration          : ['',[Validators.required]],
        ultra_agent_social: [''],
        cardnumber        : ['',[Validators.required]],
        securitycode      : ['',[Validators.required]],
        expiry_date       : ['',[Validators.required]],
        expiry_year       : ['',[Validators.required]],
        first_name        : ['',[Validators.required]],
        last_name         : ['',[Validators.required]],
        adresss           : ['',[Validators.required]],
        city              : ['',[Validators.required]],
        state             : ['',[Validators.required]],
        zip               : ['',[Validators.required]]
      }
    )
  }
  /******************************************************************************/
	/******************************************************************************/
  /**
   * Submit the form data
   */
   onSubmit(): void {
    console.log('this is payment');
    const {duration,ultra_agent_social,cardnumber,securitycode,expiry_date,expiry_year,first_name,last_name,adresss,city,state,zip} = this.paymentForm.value;
    console.log('paymentForm='+this.paymentForm);
    this.submitted = true;
    if(this.paymentForm.invalid) {
      return;
    }
    /*
    this.router.navigateByUrl('/idx-payment', {
      state: {membershipname: membershipname, mls: mls}
    });*/
    
  }
  /******************************************************************************/
	/******************************************************************************/

}
