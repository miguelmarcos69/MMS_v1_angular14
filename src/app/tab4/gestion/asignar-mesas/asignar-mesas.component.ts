import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/services/app-service.service';

@Component({
  selector: 'app-asignar-mesas',
  templateUrl: './asignar-mesas.component.html',
  styleUrls: ['./asignar-mesas.component.scss'],
})
export class AsignarMesasComponent implements OnInit {
  mesas: any;
  usuarios: any;
  usuSelect: any;

  constructor(public appservice: AppServiceService) {
    this.usuSelect = JSON.parse('{}');
    this.usuarios = JSON.parse('{}');
  }
  ngOnInit() {
    this.load();
  }
  load() {
    this.appservice.leerMesas().subscribe((res) => {
      this.mesas = res;
      console.log(this.mesas);

    });
    this.appservice.datosUsuarios().subscribe((res) => {
      this.usuarios = res;
      console.log(this.usuarios);

    });


  }
  guardar() {
    console.log(this.usuSelect);

    this.appservice.modificarUsuSelec(this.usuSelect).subscribe((res: any) => {
      if (res.valido) {
        this.usuSelect = {};
        this.load();
        this.appservice.presentToast('success', 'Se ha modificado correctamente');
      }
    });
  }
}
