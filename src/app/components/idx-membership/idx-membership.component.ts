import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder,Validators, FormGroup,FormArray,FormControl } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router'; 
import { Router } from '@angular/router';
import { MlsService } from 'src/app/services/mls/mls.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import Swal from 'sweetalert2';
import { TokenStorageService } from '../../services/token-storage.service';
import { IdxMlsService } from '../../services/idx-mls.service';

@Component({
  selector: 'app-idx-membership',
  templateUrl: './idx-membership.component.html',
  styleUrls: ['./idx-membership.component.css']
})
export class IdxMembershipComponent implements OnInit {
  mlsData: any;
  errorMessage: any;
  brainTreeToken: any;
  membershipname:any;
  price:any;
  userid: string[] = [];
  isLoggedIn = false;
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
  constructor(private formBuilder: FormBuilder, private mlsService: MlsService, private paymentService: PaymentService, private router: Router,
    private route: ActivatedRoute, private tokenStorageService: TokenStorageService,private IdxMlsService:IdxMlsService) { }
  /******************************************************************************/
	/******************************************************************************/  
  /**
   * Function and variables are called or initialized
   */ 
  ngOnInit(): void {
    this.getAllMls();
    this.getClientToken();
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.userid = this.tokenStorageService.getUser().userid;
      }
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
   * Get all the mls data from the database
   */
   getClientToken(): void {
    this.paymentService.getToken().subscribe((data)=>{
      this.brainTreeToken = data;
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

//     if(membershipname == 'agent_website') {
//       this.membershipname = 'Ultra Agent Website';
//       this.price ='$24.95 USD';
//  }
//     if(membershipname == 'idx_starter') {
//       this.membershipname = 'Ultra Agent Website with Ultra Agent IDX (Starter)';
//       this.price = '$34.95 USD';
//     }
//     if(membershipname == 'idx_power_agent') {
//       this.membershipname = 'Ultra Agent Website with Ultra Agent IDX (Power Agent)';
//       this.price = '$49.95 USD';
//     }
//     if(membershipname == 'idx_broker') {
//       this.membershipname = 'Ultra Agent Website with Ultra Agent IDX (Broker)';
//       this.price = '$74.95 USD';
//     }
    if(this.membershipForm.invalid) {
      return;
    }

    // this.IdxMlsService.addIdxMembership(this.userid,this.membershipname,this.price).subscribe( data => {
    //   console.log('data='+data.message);
    //   console.log('data='+data.status_code);
    //   if(data.status_code == 200) {
    //     //Swal.fire('Success!',data.message,'success');
        
    //   Swal.fire({
    //     icon: 'success',
    //     title: data.message,
    //     confirmButtonText: 'Save',
        
    //   }).then((result) => {
    //     //this.router.navigateByUrl('/create-listings');
    //   })
        
    //   } else {
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Oops...',
    //       text: data.message
    //     })
    //   }
    // },err=>{
    //   console.log('err='+err);
    //   this.errorMessage = err.error.message;
    // })
    localStorage.removeItem('membershipname');
    localStorage.removeItem('mls');
    localStorage.removeItem('brainTreeToken');
    localStorage.setItem('brainTreeToken', this.brainTreeToken);
    localStorage.setItem('membershipname', membershipname);
    localStorage.setItem('mls', mls);
    this.router.navigateByUrl('/idx-payment');
    //console.log(this.formListing.value);
  }
  /******************************************************************************/
	/******************************************************************************/
  
}
