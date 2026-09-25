import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';

@Component({
  selector: 'app-mod-usuarios',
  templateUrl: './mod-usuarios.component.html',
  styleUrls: ['./mod-usuarios.component.scss'],
})
export class ModUsuariosComponent implements OnInit {
  usuarios: any;
  busqueda: any;
  url: any;
  rec: string;

  constructor(private appService: AppServiceService, private router: Router,
    private route: ActivatedRoute) {
    this.url = this.appService.url;
  }

  ngOnInit() {
    this.load();
    this.rec = this.route.snapshot.paramMap.get('rec');
    console.log(this.rec);

    if (this.rec !== null) {
      this.router.navigate(['tabs/tab4/modUsu']);


    }
  }

  async load() {
    await this.appService.datosUsuarios().subscribe((res: any) => {
      this.usuarios = res;
      console.log(res);


    });
  }

  onSearchChange(evento) {
    this.busqueda = [];
    const ev = evento.detail.value;
    console.log(ev);
    console.log(this.usuarios);
    let i = 0;
    this.usuarios.forEach(element => {
      console.log(element.nombre.substr(0, ev.length));

      if (element.nombre.substr(0, ev.length) === ev) {
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
