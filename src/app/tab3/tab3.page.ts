import { Component,Output } from '@angular/core';
import { AppServiceService } from '../services/app-service.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  @Output() usuario: any;

  constructor(private appService: AppServiceService,) {  this.usuario = this.appService.usuario;}

}
