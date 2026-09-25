import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
import { LoginService } from 'src/app/services/login.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss'],
})
export class GestionComponent implements OnInit {
  @Output() usuario: any;

  constructor(private router: Router, public applogin: LoginService,
    private route: ActivatedRoute, private appService: AppServiceService,) {

    this.usuario = this.appService.usuario;
    console.log(this.usuario);


  }
  ngOnInit(): void {
    this.usuario = this.appService.usuario;
    console.log(this.usuario);

  }
  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      this.usuario = this.appService.usuario;
      event.target.complete();
    }, 2000);
  };
  historial() {
    this.router.navigate(['historial'], { relativeTo: this.route });
  }
  asignarMesas() {
    this.router.navigate(['asignarMesas'], { relativeTo: this.route });
  }
  modIngre() {
    this.router.navigate(['modIngre'], { relativeTo: this.route });
  }
  modClientes() {
    this.router.navigate(['modClientes'], { relativeTo: this.route });
  }
  modUsu() {
    this.router.navigate(['modUsu'], { relativeTo: this.route });
  }

  anaUsu() {
    this.router.navigate(['anaUsu'], { relativeTo: this.route });

  }
  estadisticas() {
    this.router.navigate(['estadisticas'], { relativeTo: this.route });

  }

}
