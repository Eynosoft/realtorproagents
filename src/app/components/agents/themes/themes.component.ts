import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormBuilder} from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { ThemesService } from 'src/app/services/agents/themes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent implements OnInit {
  userid: string[] = [];
  theme_id:any;
  isLoggedIn = false;
  themeSelectForm: any = {
    theme_id: null,
  };
  errorMessages: string;
  errorMessage = '';
  submitted = false;
  constructor(private formBuilder: FormBuilder, private ThemesService: ThemesService, private router: Router,
    private route: ActivatedRoute,  private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {

    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.userid = this.tokenStorageService.getUser().userid;
      }
    this.themeSelectForm = this.formBuilder.group(
      {
        theme_id: [''],
      }
    ) 
    this.getUserThemeId();
  }
  get f():{[key:string]:AbstractControl} {
    return this.themeSelectForm.controls;
  }
  onSubmit(): void{

    const {
      theme_id,
    } = this.themeSelectForm.value;
    
    this.submitted = true;
    if(this.themeSelectForm.invalid) {
      return;
    }
    
    console.log(JSON.stringify(this.themeSelectForm.value, null, 2));

    this.ThemesService.addthemesinfo(
      theme_id,
      this.userid
    ).subscribe(
      data => {
        console.log('data='+data.message);
        console.log('data='+data.status_code);
        console.log('data='+data.lastId);
        if(data.status_code == 200) {
          Swal.fire({
            icon: 'success',
            title: data.message,
            confirmButtonText: 'Save',
            
          });
            //  this.router.navigateByUrl('contacts-details/'+data.lastId);
         
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
  }
  getUserThemeId(): void {
   
    this.ThemesService.getThemesUserid().subscribe((data)=>{
      console.log(data);

    this.theme_id = data;
    });
}
  
}
