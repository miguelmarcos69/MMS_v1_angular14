import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-mod-clientes-mod',
  templateUrl: './mod-clientes-mod.component.html',
  styleUrls: ['./mod-clientes-mod.component.scss'],
})
export class ModClientesModComponent implements OnInit {
  id: string;
  cliente: any;
  selNombre;
  selApe;
  selDire;
  selTel;
  selNum;
  selLocal;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public appservice: AppServiceService,
    private location: Location
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.appservice.datosClientes().subscribe((res: any) => {
      console.log(res);
      res.forEach(ele => {
        console.log(ele.id);

        if (ele.id === this.id) {
          this.cliente = ele;
        }

      });

      this.selNombre = this.cliente.nombre;
      this.selApe = this.cliente.apellidos;
      this.selDire = this.cliente.direccion;
      this.selTel = this.cliente.telefono;
      this.selNum = this.cliente.num;
      this.selLocal = this.cliente.localidad;
      console.log(this.cliente);

    });
  }
  guardar() {
    const data = {
      id: this.cliente.id,
      nombre: this.selNombre,
      apellidos: this.selApe,
      direccion: this.selDire,
      telefono: this.selTel,
      num: this.selNum,
      localidad: this.selLocal

    };
    this.appservice.modificarCliente(data).subscribe((res: any) => {

      if (res.valido) {
        this.appservice.presentToast('success', 'Se ha modificado correctamente');

        window.location.href = window.location.protocol + '//' + window.location.host + '/tabs/tab4/modClientes';

      }
    });
  }

}
