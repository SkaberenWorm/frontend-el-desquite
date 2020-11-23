import { Component } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['not-found.component.css']
})
export class NotFoundComponent {

  constructor(private appService: AppService) {
    this.appService.pageTitle = '404 Not Found';
  }

}
