import { Component, OnInit,ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CalendarOptions } from '@fullcalendar/angular';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  Events: any[]=[];
  event:any;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
     // events:[{title:'Birthday',date:'2022-04-19'},{title:'appoinment',date:'2022-04-21'}],
    //  eventColor:'blue',

    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true
  };
  
  constructor(private httpClient: HttpClient, private router: Router, private TaskService:TaskService,private elementRef:ElementRef) { }
  onDateSelect(res: any) {
    alert('Clicked on date : ' + res.dateStr);
  }

  ngOnInit(): void {

    setTimeout(() => {
    this.TaskService.getTaskEvent()
      .subscribe((res: any) => {
        this.event = res;
        
        // var str = this.event[0].title;
// console.log(str.slice(0, str.indexOf(' ')));
  // var name = str.slice(0, str.indexOf(' '));

 console.log(this.event[0].title);
 
});

}, 250);

  setTimeout(() => {
      this.calendarOptions = {
      initialView: 'dayGridMonth',
      dateClick: this.onDateSelect.bind(this),
      events: this.event
      };
  }, 2500);
}
}
