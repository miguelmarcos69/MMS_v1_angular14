import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { AppServiceService } from 'src/app/services/app-service.service';

@Component({
  selector: 'app-anadir-usuario',
  templateUrl: './anadir-usuario.component.html',
  styleUrls: ['./anadir-usuario.component.scss'],
})
export class AnadirUsuarioComponent implements OnInit {

  showPicker;
  dateValue: string;
  dia: string;

  selNombre: any;
  selApe: any;
  selLocal: any;
  selImg: any;
  selEmail: any;
  selRol: any;
  selContra: any;
  selContra2: any;


  constructor(public appService: AppServiceService, private router: Router,
    private route: ActivatedRoute,
  ) {
    this.showPicker = false;
    this.dateValue = format(new Date(), 'yyyy-MM-dd');
    this.dia = this.appService.formatoFecha2(this.dateValue);

  }

  ngOnInit() {
    this.selRol='trab';
  }
  dateChange(fecha) {
    this.dateValue = fecha;
    this.dia = this.appService.formatoFecha2(fecha);
    console.log(this.dateValue);
    console.log(this.dia);

    this.showPicker = false;
  }
  guardar() {
    console.log(this.dateValue);
    const data = {
      nombre: this.selNombre,
      apellido:this.selApe,
      contra1: this.selContra,
      contra2: this.selContra2,
      fechaNac: this.appService.formatoFecha2(this.dateValue),
      poblacion: this.selLocal,
      img: this.selImg,
      email: this.selEmail,
      rol: this.selRol
    };


    if (this.selNombre !== undefined  && this.selApe !== undefined &&this.selEmail !== undefined
      && this.selRol !== undefined && this.selContra !== undefined && this.selContra2 !== undefined) {

      if (this.selContra === this.selContra2) {
        data.contra1 = this.selContra;
        data.contra2 = this.selContra2;
        //Guarda la nueva contrase�a
        console.log(this.selContra === this.selContra2);
        this.appService.nuevoUsuario(data).subscribe((res: any) => {

          if (res.valido) {
            this.selNombre='';
            this.selApe='';
            this.selLocal='';
            this.selImg='';
            this.selEmail='';
            this.selRol='';
            this.selContra='';
            this.selContra2='';
            this.appService.presentToast('success', 'Se ha modificado correctamente');
            this.router.navigate(['tabs/tab4']);

          }
        });


      } else {
        this.appService.presentToast('danger', 'Las contraseñas no son iguales');
      }
    } else {
      this.appService.presentToast('danger', 'No has introdicido todos los datos');

    }
  }
}
