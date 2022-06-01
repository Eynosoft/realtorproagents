import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder,Validators, FormGroup,FormArray,FormControl } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-idx-payment',
  templateUrl: './idx-payment.component.html',
  styleUrls: ['./idx-payment.component.css']
})
export class IdxPaymentComponent implements OnInit {
  errorMessage: any;
  planId: any;
  paymentData: any;
  membershipname: any;
  totalPriceCalculated: any;
  mls: any;
  brainTreeToken: any;
  plansData: any = [];
  paymentForm: any = {
    planName: null,
    ultra_agent_social: null,
    totalPriceCalculated: null,
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
    private route: ActivatedRoute, private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.totalPriceCalculated = 0;
    this.showAllPlans();
    this.brainTreeToken = localStorage.getItem('brainTreeToken');
    
    //this.membershipname = localStorage.getItem('membershipname');
    this.mls = localStorage.getItem('mls');
    
    this.paymentForm = this.formBuilder.group(
      {
        planName            : ['',[Validators.required]],
        ultra_agent_social  : [''],
        totalPriceCalculated: [''],
        cardnumber          : ['',[Validators.required]],
        securitycode        : ['',[Validators.required]],
        expiry_date         : ['',[Validators.required]],
        expiry_year         : ['',[Validators.required]],
        first_name          : ['',[Validators.required]],
        last_name           : ['',[Validators.required]],
        adresss             : ['',[Validators.required]],
        city                : ['',[Validators.required]],
        state               : ['',[Validators.required]],
        zip                 : ['',[Validators.required]]
      }
    )
  }
  /******************************************************************************/
	/******************************************************************************/
  calculatePrice(event: any): any{
    var price = 0;
    for(let i=0;i<this.plansData.length;i++) {
      if(this.plansData[i].id == event.target.id && event.target.value == "pay_monthly") {
        price = this.plansData[i].price;
        this.planId = this.plansData[i].id;
      }
      if(this.plansData[i].id == event.target.id && event.target.value == "pay_six_montly") {
        price = this.plansData[i].price * 5;
        this.planId = this.plansData[i].id;
      }
      if(this.plansData[i].id == event.target.id && event.target.value == "pay_twelve_month") {
        price = price + this.plansData[i].price * 10;
        this.planId = this.plansData[i].id;
      }
    }
    this.totalPriceCalculated = price;
    //return this.totalPriceCalculated;
  }
  /******************************************************************************/
	/******************************************************************************/
  /**
   * Submit the form data
   */
   onSubmit(): void {
    
    const {planName,ultra_agent_social,totalPriceCalculated,cardnumber,securitycode,expiry_date,expiry_year,first_name,last_name,adresss,city,state,zip} = this.paymentForm.value;
    console.log('paymentForm='+this.paymentForm);
    this.submitted = true;
    if(this.paymentForm.invalid) {
      return;
    }
    this.paymentService.subscribePlan(this.brainTreeToken,
      this.planId,first_name,last_name,cardnumber,securitycode,expiry_date,expiry_year).subscribe (
      data => {
        console.log('data='+data.message);
        console.log('data='+data.status_code);
        if(data.status_code == 200) {
          //Swal.fire('Success!',data.message,'success');
          
        Swal.fire({
          icon: 'success',
          title: data.message,
          confirmButtonText: 'Save',
          
        }).then((result) => {
          //this.router.navigateByUrl('/create-listings');
        })
          
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.message
          })
        }
        
        //Swal.fire('Success!', 'Listing Added Successfully.!', 'success');
        
      },
      err => {
        console.log('err='+err);
        this.errorMessage = err.error.message;
        
      }
    )
    /*
    this.router.navigateByUrl('/idx-payment', {
      state: {membershipname: membershipname, mls: mls}
    });*/
    
  }
  /******************************************************************************/
	/******************************************************************************/
  
  showAllPlans(): void {
    this.paymentService.getPlans().subscribe((data)=> {
      //this.plansData = data;
    const mname = localStorage.getItem('membershipname');
    console.log(mname);
    if(mname == 'agent_website') {
      this.membershipname = 'Ultra Agent Website';
    }
    if(mname == 'idx_starter') {
      this.membershipname = 'Ultra Agent Website with Ultra Agent IDX (Starter)';
    }
    if(mname == 'idx_power_agent') {
      this.membershipname = 'Ultra Agent Website with Ultra Agent IDX (Power Agent)';
    }
    if(mname == 'idx_broker') {
      this.membershipname = 'Ultra Agent Website with Ultra Agent IDX (Broker)';
    }
    
    if(data.length > 0) {
        for(var i = 0; i < data.length; i++) {
          var obj = data[i];
          if(mname == 'agent_website' && i < 3) {
            this.plansData[i] = data[i];
          }
          
        }
    }
    console.log(this.plansData);
   });
  }
}
