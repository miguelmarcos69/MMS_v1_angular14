import { Component, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from '../services/app-service.service';
import { LoginService } from '../services/login.service';
import { ComandasComponent } from './comandas/comandas/comandas.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @Output() usuario: any;


  constructor(private router: Router, public applogin: LoginService, private route: ActivatedRoute,
    private appService: AppServiceService,) {
    this.usuario = this.appService.usuario;

  }

  onLogin() {
    this.router.navigate(['login'], { relativeTo: this.route });
  }
  config() {
    this.router.navigate(['config'], { relativeTo: this.route });
  }
  onLogout() {
    this.applogin.logout();
    window.location.reload();

  }
}
