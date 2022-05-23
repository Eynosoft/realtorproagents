import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,NavigationEnd,Router } from '@angular/router';

@Component({
  selector: 'app-drip-email-marketing-sidebar',
  templateUrl: './drip-email-marketing-sidebar.component.html',
  styleUrls: ['./drip-email-marketing-sidebar.component.css']
})
export class DripEmailMarketingSidebarComponent implements OnInit {
  currentRout:any;
  constructor(private router: Router) {
    this.currentRout = router.url;

   }

  ngOnInit(): void {
  }

}
