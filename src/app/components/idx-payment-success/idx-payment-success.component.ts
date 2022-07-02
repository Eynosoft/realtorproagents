import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { switchAll } from 'rxjs/operators';


@Component({
  selector: 'app-idx-payment-success',
  templateUrl: './idx-payment-success.component.html',
  styleUrls: ['./idx-payment-success.component.css']
})
export class IdxPaymentSuccessComponent implements OnInit {
idxPaymentData:any;
membershipPlan:any
subscriptionId:any;
trialDuration:any;
price:any;
planStatus:any;
nextBillingPeriod:any;
billingCycleNumber:any;
planName:any;
first_name:any;
last_name:any;
adresss:any;
city:any;
state:any;
zip:any;

  constructor( private router: Router,
    private route: ActivatedRoute, private paymentService: PaymentService) { }

  ngOnInit(): void {

//this.getAgentPlanPayment();
this.membershipPlan = localStorage.getItem('membershipPlan');
this.subscriptionId = localStorage.getItem('subscriptionId');
this.trialDuration = localStorage.getItem('trialDuration');
this.price = localStorage.getItem('price');
this.planStatus = localStorage.getItem('status');
this.nextBillingPeriod = localStorage.getItem('nextBillPeriod');
this.billingCycleNumber = localStorage.getItem('totalBillingCycle');
this.planName = localStorage.getItem('planName');
this.first_name = localStorage.getItem('first_name');
this.last_name = localStorage.getItem('last_name');
this.adresss = localStorage.getItem('adresss');
this.city = localStorage.getItem('city');
this.state = localStorage.getItem('state');
this.zip = localStorage.getItem('zip');
  }

   /******************************************************************************/
	/****************"**************************************************************/
  /*
  retrive agent subcribe plan data 
  */
//   getAgentPlanPayment(): void{
//   this.paymentService.getPlanDetails().subscribe((data)=> {
//    this.idxPaymentData = data;
//     console.log(data);
//    })
//  }
 }

