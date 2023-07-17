import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { HttpParams,HttpEventType, HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
 taskList:any;
 taskCount:any;
 taskContactName:any;
 popoverTitle:string = 'Delete Task';
 popoverMessage:string = 'Are you sure you want to delete task?';
 confirmClicked:boolean = true;
 cancelClicked:boolean = true;
  constructor(private TaskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    this.getAllTaskList();
  }
      /******************************************************************************/
	/******************************************************************************/
    // show all task list 
  getAllTaskList(): void {
    this.TaskService.getAllTask().subscribe((data)=>{
      console.log(data);
      
      this.taskList = data.task;
      this.taskCount = data.task.length;
  });
}
      /******************************************************************************/
	/******************************************************************************/
    // delete all task by id 
deleteTask(id:number): void{
  this.TaskService.deleteTaskList(id).subscribe(
    data => {
      console.log('data='+data.message);
      console.log('data='+data.status_code);
      if(data.status_code == 200) {
        this.getAllTaskList();
        Swal.fire('Success!',data.message,'success');
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
    }
  )
}
}
