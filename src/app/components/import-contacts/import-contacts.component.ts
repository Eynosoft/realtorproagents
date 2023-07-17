import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ContactsService } from 'src/app/services/contacts.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  AbstractControl,
  FormBuilder,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Contacts } from 'src/app/interface/contacts';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
declare const goToSupportTicket: any;
const BASE_URL = environment.baseUrl; 
@Component({
  selector: 'app-import-contacts',
  templateUrl: './import-contacts.component.html',
  styleUrls: ['./import-contacts.component.css'],
})
export class ImportContactsComponent implements OnInit {
  selectedImport: string[] = [];
  public contacts: Contacts[] = [];
  selectedMainFile?: FileList;
  mainFile: string[] = [];
  progressInfosMain: any[] = [];
  progressInfos: any[] = [];
  dropDownList: any[] = [];
  showcheck:boolean= false;
  ischecked: boolean = false;
  headerListData:any[] = [];
  //baseUrl: string;

  dropDownOptions: any[] = [
    { key: 'first_name', value: 'First Name' },
    { key: 'last_name', value: 'Last Name' },
    { key: 'company', value: 'Company' },
    { key: 'address1', value: 'Address1' },
    { key: 'city', value: 'City' },
    { key: 'county', value: 'County' },
    { key: 'state', value: 'State' },
    { key: 'zip', value: 'Zip' },
    { key: 'home_phone', value: 'Home Phone' },
    { key: 'work_phone', value: 'Work Phone' },
    { key: 'mobile_phone', value: 'Mobile Phone' },
    { key: 'fax', value: 'Fax' },
    { key: 'email', value: 'Email' }
    
  ];

  message: string[] = [];
  previewsmain: string[] = [];

  lines: any = []; //for headings
  linesR: any = []; // for rows
  imageInfos?: Observable<any>;
  importContactsForm: any = {
    csv_file: null,
    headerList: null
    //dropDownData:null
  };
  errorMessages: string;
  errorMessage = '';
  submitted = false;
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private uploadService: FileUploadService,
    private ContactsService: ContactsService, 
    private router: Router
  ) {  }

  ngOnInit(): void {
   // this.baseUrl = window.location.origin;

    //console.log(this.dropDownOptions);
    this.importContactsForm = this.formBuilder.group({
      csv_file: [''],
     // csv_file: this.formBuilder.array([]),
      //headerList: this.formBuilder.array([]),
      //headerList: ['',[CustomRequired.matchRequired]]
      headerList: ['']
      
    });

    //for (const [key, value] of Object.entries(this.dropDownOptions)) {
    // console.log(key, value[1]);
    //}
  }
  // contactsHeader(): FormGroup {
  //   return this.formBuilder.group({
  //     first_name: ['', [Validators.required]],
  //     last_name: ['', [Validators.required]],
  //     email: ['', [Validators.required]],
  //   });
  // }

  get f(): { [key: string]: AbstractControl } {
    return this.importContactsForm.controls;
  }

  //   get csv_file(): FormArray{
  //     return this.importContactsForm.get('csv_file') as FormArray;
  // }
 /******************************************************************************/
	 /****************"**************************************************************/
    /**
      get header name from dropdown list select in formArray
    */

  changeHeaderList(e:any) {
    var multipleExist;
    var currentIndex = e.target.id;
    var errorMsg = 0;
    var msg = '';
    if(currentIndex == 0 && e.target.value != 'first_name') {
      errorMsg = 1;
      msg = 'Please select firstname';
    }
    if(currentIndex == 1 && e.target.value != 'last_name') {
      errorMsg = 1;
      msg = 'Please select lastname';
    }
    if(currentIndex == 2 && e.target.value != 'company') {
      errorMsg = 1;
      msg = 'Please select company';
    }
    if(currentIndex == 3 && e.target.value != 'address1') {
      errorMsg = 1;
      msg = 'Please select address';
    }
    
    if(currentIndex == 4 && e.target.value != 'city') {
      errorMsg = 1;
      msg = 'Please select city';
    }
    if(currentIndex == 5 && e.target.value != 'county') {
      errorMsg = 1;
      msg = 'Please select county';
    }
    if(currentIndex == 6 && e.target.value != 'state') {
      errorMsg = 1;
      msg = 'Please select state';
    }
    if(currentIndex == 7 && e.target.value != 'zip') {
      errorMsg = 1;
      msg = 'Please select zip';
    }
    if(currentIndex == 8 && e.target.value != 'home_phone') {
      errorMsg = 1;
      msg = 'Please select home phone';
    }
    if(currentIndex == 9 && e.target.value != 'work_phone') {
      errorMsg = 1;
      msg = 'Please select work phone';
    }
    if(currentIndex == 10 && e.target.value != 'email') {
      errorMsg = 1;
      
      msg = 'Please select email';
    }
    
    if(errorMsg == 1) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html:
        msg + '</br></br>  If this error continues, please use our '
        +'<a href="'+ BASE_URL +'/#/support-system" onclick="goToSupportTicket()">Support Ticket System</a> ' +
       'We might request our CSV file for review.'
        //text: msg
      });
      return;
    }
    this.headerListData?.push(e.target.value);
    console.log(this.headerListData);
  }
 /******************************************************************************/
	 /****************"**************************************************************/
   
  changeHeader(e: any) {
  
    //const headerList: FormArray = this.importContactsForm.get(
    //  'headerList'
    //) as FormArray;

    //headerList.push(new FormControl(e.target.value));
    // else {
    //    const index = headerList.findIndex(x => x.value === e.target.value);
    //    headerList.removeAt(index);
    // }
  }
  
 /******************************************************************************/
	 /****************"**************************************************************/
    /**
   * upload csv file 
    */
  onSubmit(): void {
    
    //console.log(this.importContactsForm.value.headerList);
    console.log(this.importContactsForm.value);
    //console.log(this.headerListData);
    
    const { headerList } = this.importContactsForm.value;
    if(this.headerListData.length == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        customClass: {
          confirmButton: 'example-class' //insert class here
        },
        html: '<span style="color:red">Missing required fields firstname,lastname,email </br></br>  If this error continues, please use our '
         +'<a href="'+ BASE_URL +'/#/support-system" onclick="goToSupportTicket()">Support Ticket System</a> ' +
        'We might request our CSV file for review.</span>'
       // text: 'Missing required fields firstname,lastname,email',
      });
      return; 
    }
    var array_b = ['first_name','last_name','email'];
    //const multipleExist = this.headerListData.every(value => {
    //  return array_b.includes(value);
    //});
    console.log(this.importContactsForm.value.headerList)
    var j = 0;
    var multipleExist;
    for(var i = 0; i < this.importContactsForm.value.headerList.length; i++) {
      
      multipleExist = this.headerListData.every(value => {
        return this.importContactsForm.value.headerList.includes(value);
      });
      if(multipleExist) {
        j++
      }
      
      //if(arr[i] == num1 && arr[i+1] == num2 && arr[i+2] == num3) {
      //    exists = true;
     // }
    }
    if(j < 3) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Missing required fields firstname,lastname,email',
      });
      return;
    }
    
  console.log('success='+multipleExist);
    if(!multipleExist) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Missing required fields firstname,lastname,email',
      });
      return; 
    }
    //console.log(headerList);
    //console.log('error='+this.importContactsForm.hasError('matchRequiredError'));
    //console.log('invalid='+this.importContactsForm.invalid);
    this.submitted = true;
    if (this.importContactsForm.invalid) {
      return;
    }
    //console.log(this.importContactsForm);
    //console.log(this.importContactsForm.value);
    
    if (this.linesR.length > 0) {
      //console.log(this.linesR);
      this.ContactsService.csvFileImport(this.linesR, headerList).subscribe(
        (data) => {
          console.log('data=' + data.message);
          console.log('data=' + data.status_code);
          if (data.status_code == 200) {
            Swal.fire('Success!', data.message, 'success');
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data.message,
            });
          }
        },
        (err) => {
          console.log('err=' + err);
          this.errorMessage = err.error.message;
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select csv file to import',
      });
      return;
    }
  }

 /******************************************************************************/
	 /****************"**************************************************************/
    /**
   * import csv file 
    */
  importCsv(event: any): void {
    // event.preventDefault();
    //console.log('importCSV');
  }
  // for check checkbox checked or not -------------------------------
  importRow(e: any) {
    this.ischecked = e.target.checked;
  }

  // read csv file code  select file event-----------------------------------------------------------

  changeListener(event: any) {

    this.showcheck = true;
    if (this.isValidCSVFile(event.target.files[0])) {
      let file: File = event.target.files[0];
      //console.log(file.name);
      //console.log(file.size);
      //console.log(file.type);
      //File reader method
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        //this.setState({file: reader.result})
        let csv: any = reader.result;
        let allTextLines = [];
        allTextLines = csv.split(/\r|\n|\r/);

        //Table Headings
        let headers = allTextLines[0].split(';');
        let data = headers;
        let tarr = [];
        for (let j = 0; j < headers.length; j++) {
          tarr.push(data[j]);
          var temp = data[j];
          this.dropDownList = temp.split(',');

          //this.dropDownList.push(data[j]);
        }
        //Pusd headings to array variable
        this.lines.push(tarr);
        // Table Rows
        let tarrR = [];
        let arrl = allTextLines.length;
        let rows = [];
        for (let i = 0; i < arrl; i++) {
          rows.push(allTextLines[i].split(';'));
        }

        for (let j = 0; j < arrl; j++) {
          tarrR.push(rows[j]);
          tarrR = tarrR.filter(function (i) {
            return i != '';
          });
        }
        if (this.ischecked) {
          tarrR.splice(1, 1);
        }
        //Push rows to array variable
        this.linesR.push(tarrR);
        
         console.log(this.linesR)
      };
      this.selectedImport.push(this.lines);
      this.importContactsForm.setValue({
        headerList: this.headerListData,
        csv_file: this.linesR
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid File!',
      });
    }
  }
/******************************************************************************/
	 /****************"**************************************************************/
   /**
   * validate csv file extention
    */
  isValidCSVFile(file: any) {
    return file.name.endsWith('.csv');
  }
}
