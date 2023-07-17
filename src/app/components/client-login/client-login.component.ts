import { TokenStorageService } from './../../services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AbstractControl, FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Validation from 'src/app/utils/validation';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.css']
})
export class ClientLoginComponent implements OnInit {
  title = 'Client Login';
 
  form: any = {
    email: null,
    password: null
  }
  isLoggedIn = false;
  isLoginFailed = false;
  isLoggedOut = false;
  errorMessage = '';
  roles: string[] = [];
  submitted = false;
  constructor(private formBuilder: FormBuilder,private authService: AuthService,private router: Router,private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      }
      
    this.form = this.formBuilder.group(
      {
        email:['',[Validators.required, Validators.email]],
        password:['',[Validators.required,Validators.maxLength(100)]]
      }
    )
  }
  get client_login():{[key:string]: AbstractControl} {
    return this.form.controls;
  }
  onSubmit(): void {
    const {email,password} = this.form.value;
    this.submitted = true;
    if(this.form.invalid) {
      return;
    }
    console.log(JSON.stringify(this.form.value, null, 2));
    this.authService.login(email,password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.auth_token);
        this.tokenStorage.saveUser(data); 
        //console.log('message='+data.message);
        //console.log('status_code='+data.status_code);
        //console.log('token='+data.auth_token);
        //console.log('data1='+data.expiry);
        //Swal.fire(data.message);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.isLoggedOut = true;
       
        this.roles = this.tokenStorage.getUser().roles;
        console.log('roles='+this.roles);
        this.router.navigateByUrl('client-dashboard');
      },
      err => {
        console.log('err='+err);
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.isLoggedIn = false;
      }
    )
  }
  reloadPage(): void {
    window.location.reload();
  }
}
