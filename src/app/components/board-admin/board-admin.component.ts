import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: string;
  title = 'Admin Dashboard';
  constructor(private userSercive: UserService) { }

  ngOnInit(): void {
    this.userSercive.getAdminBoard().subscribe(
      data=> {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    )
  }

}
