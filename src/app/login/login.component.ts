import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { ComandasComponent } from '../tab1/comandas/comandas/comandas.component';
import { AppServiceService } from '../services/app-service.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild(ComandasComponent) comandas!: ComandasComponent;

  nombre: string;
  contra: string;
  role: any;
  respuesta: any;



  private subscription: Subscription = new Subscription();
  constructor(public applogin: LoginService,
    private route: ActivatedRoute,

    public appservice: AppServiceService
  ) { }

  ngOnInit() {

    this.respuesta = JSON.parse('{}');
  }

  onLogin() {

    const formValue = { username: this.nombre, password: this.contra, role: this.role };



    this.subscription.add(
      this.applogin.login(formValue).subscribe((res) => {
        this.respuesta = res;
        if (this.respuesta.valido) {
          this.appservice.presentToast('success', 'Usuario logueado');

          window.location.reload();
        } else {
          //si fallas en el logueo
          this.applogin.logout();
          this.appservice.presentToast('danger', (this.respuesta.msg));
        }



      })
    );
  }

}
