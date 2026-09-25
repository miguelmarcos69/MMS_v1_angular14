import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { AppServiceService } from 'src/app/services/app-service.service';

@Component({
  selector: 'app-mod-usuarios-mod',
  templateUrl: './mod-usuarios-mod.component.html',
  styleUrls: ['./mod-usuarios-mod.component.scss'],
})
export class ModUsuariosModComponent implements OnInit {
  @ViewChild('popover') popover;
  id: string;
  usuario: any;
  selNombre;
  selContra;
  selContra2;
  selEmail;
  selTel;
  selNum;
  selObs;
  selLocal: any;
  selNac;
  selImg;
  selRol;
  isOpen: boolean;
  fechaNac;
  showPicker;
  modo: string;
  dateValue: any;
  formatingString: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public appService: AppServiceService,
  ) {
    this.usuario = JSON.parse('{}');
    this.id = this.route.snapshot.paramMap.get('id');
    this.modo = 'date';
    this.showPicker = false;

    this.formatingString = '';
  }


  ngOnInit() {
    this.load();
    // this.setToday();
  }

  load() {
    this.appService.datosUsuarios().subscribe((res: any) => {
      console.log(res);

      res.forEach(ele => {
        console.log(ele.id);

        if (ele.id === this.id) {
          this.usuario = ele;
        }

      });
      //this.dateValue = format(new Date(), 'yyyy-MM-dd');
      this.selRol = this.usuario.rol;
      this.dateValue = this.appService.formatoFecha1(this.usuario.fechaNac);
      this.selNombre = this.usuario.nombre;
      this.selContra = this.usuario.contra;
      this.selEmail = this.usuario.email;
      this.selTel = this.usuario.telefono;
      this.selNac = this.usuario.fechaNac;
      this.selLocal = this.usuario.poblacion;
      this.selObs = this.usuario.obs;
      this.selImg = this.usuario.img;
      console.log(this.usuario);

    });
  }

  dateChange(fecha) {
    this.dateValue = fecha;
    this.usuario.fechaNac = this.appService.formatoFecha2(fecha);
    this.showPicker = false;
  }



  guardar() {
    console.log(this.dateValue);
    const data = {
      id: this.usuario.id,
      nombre: this.selNombre,
      contra1: '',
      contra2: '',
      fechaNac: this.appService.formatoFecha2(this.dateValue),
      poblacion: this.selLocal,
      img: this.selImg,
      email: this.selEmail,
      rol: this.selRol
    };

    if (this.selContra === this.usuario.contra && this.selContra2 === undefined) {
      console.log(this.selContra === this.usuario.contra);
      //No guarda la contraseña
      this.appService.modificarUsuario(data).subscribe((res: any) => {

        if (res.valido) {

          this.appService.presentToast('success', 'Se ha modificado correctamente');
          window.location.href = window.location.protocol + '//' + window.location.host + '/tabs/tab4/modUsu';


        }
      });



    } else {
      if (this.selContra === this.selContra2) {
        data.contra1 = this.selContra;
        data.contra2 = this.selContra2;
        console.log(this.selContra);
        console.log(this.selContra2);

        //Guarda la nueva contraseña
        console.log(this.selContra === this.selContra2);
        this.appService.modificarUsuario(data).subscribe((res: any) => {

          if (res.valido) {
            this.appService.presentToast('success', 'Se ha modificado correctamente');
            console.log('rec');
            this.appService.recargar = true;
            window.location.href = window.location.protocol + '//' + window.location.host + '/tabs/tab4/modUsu';

          }
        });

      } else {
        this.appService.presentToast('danger', 'Las contraseñas no son iguales');
      }
    }
  }
}
