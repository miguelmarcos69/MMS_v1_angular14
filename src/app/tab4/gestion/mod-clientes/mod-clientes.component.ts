import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
@Component({
  selector: 'app-mod-clientes',
  templateUrl: './mod-clientes.component.html',
  styleUrls: ['./mod-clientes.component.scss'],
})
export class ModClientesComponent implements OnInit {
  clientes: any;
  busqueda: any;
  nombre: any;
  apellidos: any;
  direccion: any;
  tlfn: any;
  rec: any;

  constructor(private appService: AppServiceService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    console.log(this.appService.recargar);
    this.load();
  }

  load() {
    this.appService.datosClientes().subscribe((res: any) => {
      this.clientes = res;
      console.log(res);


    });
  }
  onSearchChange(evento) {
    this.busqueda = [];
    const ev = evento.detail.value;
    console.log(ev);
    console.log(this.clientes);
    let i = 0;
    this.clientes.forEach(element => {
      console.log(element.nombre.substr(0, ev.length));

      if (element.telefono.substr(0, ev.length) === ev) {
        this.busqueda[i] = element;
        i++;
      }
      if (element.nombre.substr(0, ev.length).toLowerCase() === ev) {
        this.busqueda[i] = element;
        i++;
      }



    });
    console.log(this.busqueda);

    if (ev === '') {
      this.busqueda = '';

    }

  }
  modificar(id) {
    this.router.navigate([id], { relativeTo: this.route });

  }
}
