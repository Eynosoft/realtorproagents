import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { AbstractControl, FormBuilder,Validators, FormGroup,FormArray,FormControl } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { switchAll } from 'rxjs/operators';
import { TokenStorageService } from '../../services/token-storage.service';

declare const paymentMethodNonce: any;
declare const paymentNonceGenerate: any;
declare const getIframeContent: any;
@Component({
  selector: 'app-idx-payment',
  templateUrl: './idx-payment.component.html',
  styleUrls: ['./idx-payment.component.css']
})
export class IdxPaymentComponent implements OnInit {
  // @ViewChild('payment') paymentElement : ElementRef; 
   @ViewChild('inputNonce') inputNonce:ElementRef;
  errorMessage: any;
  userid: string[] = [];
  planId: any;
  planPrice:any
  paymentData: any;
  membershipname: any;
  totalPriceCalculated: any;
  mls: any;
  nonce:any="";
  brainTreeToken: any;
  plansData: any = [];
  amount:any;
  billingCycle:any;
  planStatus:any;
  paymentStatus:any;
  paymentMethod:any;
  duration:any;
  currentStatus:any;
  transectionId:any;
  paymentResponse:any;
  paymentMode:any;
  cardNumber:any;
  securityCode:any;
  expireDate:any;
  paymentId:any;
  IdxMlsPeriod:any;
  payment_details:any;
  trialDuration:any;
  subscriptionId:any;
  isLoggedIn = false;
  paymentForm: any = {
    planName: null,
    ultra_agent_social: null,
    totalPriceCalculated: null,
    payment_method_nonce:null,
    client_token:null,
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
  
  /******************************************************************************/
	/******************************************************************************/
  constructor(private formBuilder: FormBuilder, private router: Router,
    private route: ActivatedRoute, private paymentService: PaymentService, private tokenStorageService:TokenStorageService) { }

 
  ngOnInit(): void {

    this.brainTreeToken = localStorage.getItem('brainTreeToken');
    paymentNonceGenerate(this.brainTreeToken);
    this.totalPriceCalculated = 0;
    this.showAllPlans();
    //this.membershipname = localStorage.getItem('membershipname');
   this.mls = localStorage.getItem('mls');
   if (this.tokenStorageService.getToken()) {
    this.isLoggedIn = true;
    this.userid = this.tokenStorageService.getUser().userid;
    }
    
  
    this.paymentForm = this.formBuilder.group(
      {
        planName            : ['',[Validators.required]],
        ultra_agent_social  : [''],
        totalPriceCalculated: [''],
        payment_method_nonce:[''],
        client_token        :[''],
        // cardnumber          : ['',[Validators.required]],
        // securitycode        : ['',[Validators.required]],
        // expiry_date         : ['',[Validators.required]],
        // expiry_year         : ['',[Validators.required]],
        first_name          : ['',[Validators.required]],
        last_name           : ['',[Validators.required]],
        adresss             : ['',[Validators.required]],
        city                : ['',[Validators.required]],
        state               : ['',[Validators.required]],
        zip                 : ['',[Validators.required]]
      }
    )
  } 
 
  get f():{[key:string]:AbstractControl} {
    return this.paymentForm.controls;
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

//      ganarateNonce(event:any){  
//       //event.preventDefault(); 
//      paymentMethodNonce(this.brainTreeToken);
//  // this.paymentElement.nativeElement.submit()
// }

  /******************************************************************************/
	/****************"**************************************************************/
  /**
   * Submit the form data
   */
  
    onSubmit(): void {
      paymentMethodNonce(this.brainTreeToken);
     
  const {planName,ultra_agent_social,totalPriceCalculated,payment_method_nonce,cardnumber,expiry_date,securitycode,first_name,last_name,adresss,city,state,zip} = this.paymentForm.value;
  this.submitted = true;
  console.log(this.paymentForm.value);

  if(this.paymentForm.invalid) {
   return;
  }
  this.nonce = this.inputNonce.nativeElement.value
  if(!this.nonce){

    setTimeout(() => {
      this.nonce = this.inputNonce.nativeElement.value;
      
        this.paymentService.subscribePlan(this.brainTreeToken,this.nonce,
        this.planId,cardnumber,expiry_date,securitycode,first_name,last_name).subscribe (
        data => {
              this.payment_details = data;
              this.payment_details = JSON.stringify(this.payment_details);
              this.amount  = '$'+data.subscription.price+' USD';
              this.billingCycle = data.subscription.currentBillingCycle;
              this.subscriptionId = data.subscription.id;
              this.planStatus =  data.subscription.status;
              this.IdxMlsPeriod = data.subscription.nextBillingDate.date; 
              this.currentStatus = data.subscription.status;
              this.duration = data.subscription.numberOfBillingCycles; 
              this.trialDuration = data.subscription.trialDuration; 
              this.duration = data.subscription.numberOfBillingCycles; 
            if(data.subscription.transactions[0]){
              this.paymentStatus = data.subscription.transactions[0].status;
              this.transectionId = data.subscription.transactions[0].paymentReceipt.id;
              this.paymentMethod = data.subscription.transactions[0].paymentInstrumentType;
              this.paymentResponse = data.subscription.transactions[0].processorResponseText;
              this.cardNumber = data.subscription.transactions[0].creditCard.last4;
              this.expireDate = data.subscription.transactions[0].creditCard.expirationMonth; 
              this.expireDate +='/'+ data.subscription.transactions[0].creditCard.expirationYear;
              this.paymentId = data.subscription.transactions[0].paymentReceipt.id;
            }
  
           console.log(data);
        },
        err => {
          console.log('err='+err);
          this.errorMessage = err.error.message;
          
        }
      );
    
     },1000);
  }
  /******************************************************************************/
	/****************"**************************************************************/

setTimeout(() => {
  
   /******************************************************************************/
	/****************"**************************************************************/
  /**
   * add agent subcription plan data
   */
 
   this.paymentService.agentPlan(this.payment_details,this.userid,this.subscriptionId,planName,this.amount,this.billingCycle,this.planStatus).subscribe(data=>{
    console.log("data"+data.message);
    console.log("data"+data.status_code);

  },err=>{
    console.log('err='+err);
    this.errorMessage = err.error.message;
  })
    /******************************************************************************/
	 /****************"**************************************************************/
    /**
   * add transection Details of idx payment 
    */
     this.paymentService.paymentDetails(this.userid,this.paymentMethod,this.planId,this.membershipname,this.duration,this.currentStatus,this.amount,this.transectionId,this.paymentStatus,this.paymentResponse).subscribe(data=>{
      console.log("data"+data.message);
      console.log("data"+data.status_code);
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
    },err=>{
      console.log('err='+err);
      this.errorMessage = err.error.message;
    })
  
  // //    /******************************************************************************/
  // //   /****************"**************************************************************/
  // //     /**
  // //  * add idx payment order details 
  // //  */
  this.paymentService.idxOrderDetails(this.paymentMode,this.cardNumber,this.securityCode,this.expireDate,first_name,last_name,adresss,city,state,zip,this.paymentId,this.IdxMlsPeriod).subscribe(data=>{
    console.log("data"+data.message);
    console.log("data"+data.status_code);
 this.router.navigateByUrl('/idx-payment-success');
  },err=>{
    console.log('err='+err);
    this.errorMessage = err.error.message;
  })

   /******************************************************************************/
	/****************"**************************************************************/

  /*
    this.router.navigateByUrl('/idx-payment', {
      state: {membershipname: membershipname, mls: mls}
    });*/
   
    localStorage.removeItem('trialDuration');
    localStorage.removeItem('subscriptionId');
    localStorage.removeItem('planName');
    localStorage.removeItem('membershipPlan');
    localStorage.removeItem('first_name');
    localStorage.removeItem('last_name');
    localStorage.removeItem('adresss');
    localStorage.removeItem('city');
    localStorage.removeItem('state');
    localStorage.removeItem('zip');
    localStorage.removeItem('totalBillingCycle');
    localStorage.removeItem('price');
    localStorage.removeItem('status');
    localStorage.removeItem('nextBillPeriod');

    localStorage.setItem('membershipPlan', this.membershipname);
    localStorage.setItem('subscriptionId', this.subscriptionId);
    localStorage.setItem('trialDuration', this.trialDuration);
    localStorage.setItem('price', this.amount);
    localStorage.setItem('status', this.planStatus);
    localStorage.setItem('nextBillPeriod', this.IdxMlsPeriod);
    localStorage.setItem('totalBillingCycle', this.duration);
    localStorage.setItem('planName', planName);
    localStorage.setItem('first_name', first_name);
    localStorage.setItem('last_name', last_name);
    localStorage.setItem('adresss', adresss);
    localStorage.setItem('city', city);
    localStorage.setItem('state', state);
    localStorage.setItem('zip', zip);

  }, 10000);
 
}
  /******************************************************************************/
	/******************************************************************************/
  
  showAllPlans(): void {
    this.paymentService.getPlans().subscribe((data)=> {
     
      //this.plansData = data;
    const mname = localStorage.getItem('membershipname');
    console.log(mname);
    if(mname == 'agent_website') {
      this.membershipname = 'Realtorpro Agent Website';
    }
    if(mname == 'idx_starter') {
      this.membershipname = 'Realtorpro Agent Website with Realtorpro Agent IDX (Starter)';
    }
    if(mname == 'idx_power_agent') {
      this.membershipname = 'Realtorpro Agent Website with Realtorpro Agent IDX (Power Agent)';
    }
    if(mname == 'idx_broker') {
      this.membershipname = 'Realtorpro Agent Website with Realtorpro Agent IDX (Broker)';
    }
    if(data.length > 0) {
        //for(var i = 0; i < data.length; i++) {
         // var obj = data[i];
  
          if(mname == 'agent_website') {
            this.plansData[0] = data[0];
            this.plansData[1] = data[1];
            this.plansData[2] = data[5];
          }
   
           if(mname == 'idx_starter')  {
          
            this.plansData[0] = data[11];
            this.plansData[1] = data[4];
            this.plansData[2] = data[8];
          }
            
           if(mname == 'idx_power_agent') {
            
            this.plansData[0] = data[10];
            this.plansData[1] = data[3];
            this.plansData[2] = data[7];
          }
           
        if(mname == 'idx_broker' ) {
     
          this.plansData[0] = data[9];
          this.plansData[1] = data[2];
          this.plansData[2] = data[6];
        }
          
       //}
    }
    console.log(this.plansData);
    this.planPrice = this.plansData[0].price;
   });
  }
}
