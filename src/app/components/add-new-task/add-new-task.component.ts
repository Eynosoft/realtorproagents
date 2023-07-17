import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { AbstractControl,FormBuilder,Validators,FormGroup,FormControl} from '@angular/forms';
import Validation from 'src/app/utils/validation';
import { ActivatedRoute,Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.component.html',
  styleUrls: ['./add-new-task.component.css']
})
export class AddNewTaskComponent implements OnInit {
  taskList:any[]=[];
  taskCount:any;
  currentId:any;
  TaskForm: any = {
    date: null,
    task: null,
  };
  errorMessages: string;
  errorMessage = '';
  submitted = false;
  popoverTitle:string = 'Delete Task';
 popoverMessage:string = 'Are you sure you want to delete task?';
 confirmClicked:boolean = true;
 cancelClicked:boolean = true;
  constructor(private router: Router,private taskService: TaskService,private formBuilder: FormBuilder,private route: ActivatedRoute) { }

  ngOnInit(): void {
   this.getAllTaskList();
   this.currentId= this.route.snapshot.params.id;
    this.TaskForm = this.formBuilder.group(
      {
        date:['', [Validators.required]],
        task:['', [Validators.required]],
     }); 
  }
  get f():{[key:string]:AbstractControl} {
    return this.TaskForm.controls;
  }
  onSubmit(): void{

      const {
        date,
        task, 
      } = this.TaskForm.value;
      
      this.submitted = true;
      if(this.TaskForm.invalid) {
        return;
      }
      console.log(JSON.stringify(this.TaskForm.value, null, 2));
      this.taskService.addTask(
        date,
        task,
        this.currentId,

       ).subscribe(
        data => {
          console.log('data='+data.message);
          console.log('data='+data.status_code);
          console.log('data='+data.lastId);
          
          this.getAllTaskList();
          if(data.status_code == 200) {
            this.onReset();
            Swal.fire({
              icon: 'success',
              title: data.message,
              confirmButtonText: 'Save',
              
            });
            if(this.currentId){
               this.router.navigateByUrl('contacts-details/'+ this.currentId);
            }else{
              this.router.navigateByUrl('view-tasks');
            }
            } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data.message
            })
          }
          
     },
     err => {
       console.log('err='+err);
       this.errorMessage = err.error.message;
       
     });
    }
    getAllTaskList(): void {
      this.taskService.getAllTask().subscribe((data)=>{
        console.log(data);

        this.taskList = data.task;
        this.taskCount = data.task.length;

     });
    }
    deleteTask(id:number): void{
      this.taskService.deleteTaskList(id).subscribe(
        data => {
          console.log('data='+data.message);
          console.log('data='+data.status_code);
    
          if(data.status_code == 200) {
            Swal.fire('Success!',data.message,'success');
            this.getAllTaskList();
         } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data.message
            })
          } 
    }, err => {
      console.log('err='+err);
    }
    )
    }

    onReset(): void {
      this.submitted = false;
      this.TaskForm.reset();
     
    }
}
