import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
//import { FreeTrial } from 'src/app/interface/free-trial';
import { AuthService } from 'src/app/services/auth.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import Validation from 'src/app/utils/validation';
import Swal from 'sweetalert2';
import { CaptchaComponent } from 'angular-captcha'
//import { ReCaptcha2Component } from 'ngx-captcha';
//import { NgxCaptchaModule } from 'ngx-captcha';
@Component({
  selector: 'app-free-trial',
  templateUrl: './free-trial.component.html',
  styleUrls: ['./free-trial.component.css'],
  providers: [AuthService],
})
export class FreeTrialComponent implements OnInit {

 // @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;
 // @ViewChild('langInput') langInput: ElementRef;
  siteKey:string;
  title = 'Free Trial';
  value = '';
  form: any = {
    name: null,
    phone: null,
    email: null,
   // yourFirstCaptchaUserInput: null,
    recaptcha:null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  submitted = false;
  errorMessages: string;
  // @ViewChild(CaptchaComponent, { static: true })
  // captchaComponent: CaptchaComponent;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // this.captchaComponent.captchaEndpoint =
    //   'http://localhost/realtorproagents/backend/api/BotCaptcha/displayBotCaptcha';
    // console.log('Endpoint=' + this.captchaComponent.captchaEndpoint);
    this.form = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(80),
        ],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(13),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
     // recaptcha: ['', Validators.required],
     // yourFirstCaptchaUserInput: ['', [Validators.required]],
    });
    //this.siteKey ="6LcF-vMjAAAAAFed8p2Gac7OA8HdN4yCzvyychCO";
  }

  handleSuccess(data:any) {
    console.log(data);
  }
  /**
   * Process the form on submit event.
   */
  // validate(value: any, valid: any): void {
  //   // get the user-entered captcha code value to be validated at the backend side
  //   let userEnteredCaptchaCode = this.captchaComponent.userEnteredCaptchaCode;

  //   // get the id of a captcha instance that the user tried to solve
  //   let captchaId = this.captchaComponent.captchaId;

  //   const postData = {
  //     // add the user-entered captcha code value to the post data
  //     userEnteredCaptchaCode: userEnteredCaptchaCode,
  //     // add the id of a captcha instance to the post data
  //     captchaId: captchaId,
  //   };

  //   // post the captcha data to the backend
  //   /*this.authService.send(postData)
  //       .subscribe(
  //         response => {
  //           if (response.success == false) {
  //             // captcha validation failed; show the error message
  //             this.errorMessages = 'CAPTCHA validation failed.';
  //             // call the this.captchaComponent.reloadImage()
  //             // in order to generate a new captcha challenge
  //             this.captchaComponent.reloadImage();
  //           } else {
  //             // captcha validation succeeded; proceed with the workflow
  //             this.router.navigate(['/basic-success-notify']) 
  //           }
  //         },
  //         error => {
  //           throw new Error(error);
  //         });*/
  // }
  // Process the form on submit event.
  /*validate(value: any, valid: any): void {
 
    
  }*/
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    const { name, phone, email } = this.form.value;
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log(JSON.stringify(this.form.value, null, 2));
    this.authService.register(name, phone, email).subscribe(
      (data) => {
        console.log('data=' + data.message);
        console.log('data=' + data.status_code);
        //localStorage.setItem('loggedInUser', JSON.stringify(data));
        Swal.fire(data.message);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.onReset();
        //this.router.navigateByUrl('client-login');
      },
      (err) => {
        console.log('err=' + err);
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
