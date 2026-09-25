import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
import { ComandasService } from '../../../services/comandas.service';
@Component({
  selector: 'app-domicilio',
  templateUrl: './domicilio.component.html',
  styleUrls: ['./domicilio.component.scss'],
})
export class DomicilioComponent implements OnInit {
  data: any;
  nombre: any;
  apellidos: any;
  tlfn: any;
  direccion: any;
  cli: any;
  busqueda: any;
  num: any;
  localidad: any;

  constructor(private router: Router, private route: ActivatedRoute, private comandasService: ComandasService,
    public appservice: AppServiceService) {
    this.cli = JSON.parse('{}');


  }

  ngOnInit() {
    this.clientes();
  }

  siguiente() {

    if (this.nombre != null && this.apellidos != null && this.tlfn != null, this.direccion != null) {
      this.data = {
        id: this.tlfn,
        numTel: this.tlfn,
        nombreMesa: '',
        nombre: this.nombre,
        apellidos: this.apellidos,
        platos: [],
        ocupantes: 0,
        p: '',
        bebida: [],
        idusu: this.appservice.usuario.id,
        direccion: this.direccion,
        llevar: true,
        accion: 'domi'


      };

      this.comandasService.datosMesa = this.data;



      this.router.navigate(['tabs/tab1/mesa'], { replaceUrl: true });
    } else {
      this.appservice.presentToast('danger', 'No has introdicido todos los datos');
    };
  }
  sele(clie) {
    console.log(clie);

    this.nombre = clie.nombre;
    this.apellidos = clie.apellidos;
    this.direccion = clie.direccion;
    this.tlfn = clie.telefono;
    this.num = clie.num;
    this.localidad = clie.localidad;
    const id = document.getElementById('guardar');
    id.style.display = 'none';
    this.busqueda = false;
  }

  guardarCliente() {
    console.log(this.nombre);

    if (this.nombre !== '' && this.apellidos !== '' && this.direccion !== ''
      && this.num !== '' && this.localidad !== '' && this.tlfn !== '') {
      const data = {
        nombre: this.nombre,
        apellidos: this.apellidos,
        direccion: this.direccion,
        num: this.num,
        localidad: this.localidad,
        tlfn: this.tlfn,
        accion: 'domi'
      };
      this.comandasService.guardarCliente(data).subscribe((res: any) => {
        console.log(res);
        if (res.valido) {
          this.appservice.presentToast('success', 'Cliente guardado');
        } else {
          this.appservice.presentToast('danger', res.msg);

        }

      });
    } else {
      this.appservice.presentToast('danger', 'No has introducido todos los datos');
    };
  }

  clientes() {
    this.comandasService.datosClientes().subscribe((res) => {
      this.cli = res;
      console.log(this.cli);

    });
  }
  onSearchChange(evento) {
    const id = document.getElementById('guardar');
    id.style.display = '';
    this.busqueda = [];
    const ev = evento.detail.value;
    console.log(ev);
    console.log(this.cli);
    let i = 0;
    this.cli.forEach(element => {
      if (element.telefono.substr(0, ev.length) === ev) {
        this.busqueda[i] = element;
        i++;
      }


    });
    console.log(this.busqueda);

    if (ev === '') {
      this.busqueda = '';

    }

  }

}

