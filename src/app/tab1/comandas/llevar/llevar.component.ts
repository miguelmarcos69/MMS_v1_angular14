import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
import { ComandasService } from '../../../services/comandas.service';

@Component({
  selector: 'app-llevar',
  templateUrl: './llevar.component.html',
  styleUrls: ['./llevar.component.scss'],
})
export class LlevarComponent implements OnInit {
  data: any;
  nombre: any;
  apellidos: any;
  tlfn: any;
  busqueda: any;
  direccion: any;
  cli: any;

  constructor(private router: Router, private route: ActivatedRoute, private comandasService: ComandasService,
    public appservice: AppServiceService) {
    this.cli = JSON.parse('{}');
  }

  ngOnInit() {
    this.clientes();
  }

  siguiente() {

    if (this.nombre != null && this.apellidos != null && this.tlfn != null) {
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
        direccion: '',
        llevar: true,
        accion: 'llevar'


      };

      this.comandasService.datosMesa = this.data;



      this.router.navigate(['tabs/tab1/mesa'], { replaceUrl: true });
    } else {
      this.appservice.presentToast('danger', 'No has introdicido todos los datos');
    };
  }
  sele(clie) {
    this.nombre = clie.nombre;
    this.apellidos = clie.apellidos;
    this.direccion = clie.direccion;
    this.tlfn = clie.telefono;
    const id = document.getElementById('guardar');
    id.style.display = 'none';
    this.busqueda = false;
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
      console.log(element.telefono.substr(0, ev.length));

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
  guardarCliente() {
    const data = {
      nombre: this.nombre,
      apellidos: this.apellidos,
      direccion: this.direccion,
      tlfn: this.tlfn,
      accion: 'llevar'
    };
    if (this.nombre !== '' || this.apellidos !== '' || this.tlfn !== '') {

      this.comandasService.guardarCliente(data).subscribe((res: any) => {
        console.log(res);

        if (res.valido) {
          this.appservice.presentToast('success', 'Cliente guardado');
        } else {
          this.appservice.presentToast('danger', res.msg);

        }
      });
    }
  }
}
