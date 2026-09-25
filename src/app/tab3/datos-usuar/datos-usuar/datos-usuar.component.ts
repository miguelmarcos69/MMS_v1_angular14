import { HttpClient } from '@angular/common/http';
import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';

@Component({
  selector: 'app-datos-usuar',
  templateUrl: './datos-usuar.component.html',
  styleUrls: ['./datos-usuar.component.scss'],
})
export class DatosUsuarComponent implements OnInit {
  @Input() usuario: any;
  archivo = {
    nombre: null,
    nombreArchivo: null,
    base64textString: null,
    tipo: null
  }; tipo: any;
  ;
  archivos: any;
  previsualizacion: any;
  url: any;
  prev2: boolean;
  prev: boolean;


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

  constructor(private appService: AppServiceService, private http: HttpClient, private router: Router,
  ) {
    this.usuario = JSON.parse('{}');
    this.url = this.appService.url;
    console.log(this.url);
    this.prev2 = false;
    this.prev = true;
    this.archivos = new Array();
    this.tipo = 'usuar';


  }

  ngOnInit() {
    this.cargarUsuario();

  }
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterContentInit(): void {
    this.cargarUsuario();

  }
  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      this.cargarUsuario();
      event.target.complete();
    }, 2000);
  };
  dateChange(fecha) {
    this.dateValue = fecha;
    this.usuario.fechaNac = this.appService.formatoFecha2(fecha);
    this.showPicker = false;
  }


  cargarUsuario() {
    this.usuario = this.appService.usuario;
    console.log(this.usuario);
    this.previsualizacion = this.usuario.img;

    //this.dateValue = format(new Date(), 'yyyy-MM-dd');
    this.selRol = this.usuario.rol;
    console.log(this.usuario.fechaNac);

    if (this.usuario.fechaNac !== undefined) {
      this.dateValue = this.appService.formatoFecha1(this.usuario.fechaNac);

    }
    this.selNombre = this.usuario.nombre;
    this.selContra = this.usuario.contra;
    this.selEmail = this.usuario.email;
    this.selTel = this.usuario.telefono;
    this.selNac = this.usuario.fechaNac;
    this.selLocal = this.usuario.poblacion;
    this.selObs = this.usuario.obs;
    this.selImg = this.usuario.img;
    console.log(this.usuario);

  }


  capturarFile(evento) {
    const archivoCapturado = evento.target.files[0];
    console.log(evento);
    console.log(archivoCapturado);
    this.archivo.nombreArchivo = archivoCapturado.name;

    this.archivos.push(archivoCapturado);

    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      this.prev = false;
      this.prev2 = true;
      this.selImg = '/uploads/usuarios/' + this.usuario.id + '.png';
      // this.archivo.base64textString = imagen.base;
    });

    if (evento.target.files && archivoCapturado) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(archivoCapturado);
    }
  }
  handleReaderLoaded(readerEvent) {
    const binaryString = readerEvent.target.result;
    this.archivo.base64textString = btoa(binaryString);
  }
  extraerBase64 = async ($event: any) => new Promise((resolve) => {
    console.log($event);

    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result,
        });
      };

      reader.onerror = error => {
        resolve({
          base: null,
        });
      };
      return reader;
    }
    catch (e) {
      return null;
    }
  });
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
    console.log(data);


    if (this.selContra === this.usuario.contra && this.selContra2 === undefined) {
      console.log(this.selContra === this.usuario.contra);
      //No guarda la contraseña
      this.appService.modificarUsuario(data).subscribe((res: any) => {
        if (res.valido) {
          this.appService.presentToast('success', 'Se ha modificado correctamente');

        }
      });



    } else {
      if (this.selContra === this.selContra2) {
        data.contra1 = this.selContra;
        data.contra2 = this.selContra2;


        //Guarda la nueva contraseña
        console.log(this.selContra === this.selContra2);
        this.appService.modificarUsuario(data).subscribe((res: any) => {

          if (res.valido) {
            this.appService.presentToast('success', 'Se ha modificado correctamente');

          }
        });

      } else {
        this.appService.presentToast('danger', 'Las contraseñas no son iguales');
      }
    }

    this.subirArchivo(this.usuario.id);
  }
  subirArchivo(id) {
    try {
      const formularioDeDatos = new FormData();
      this.archivos.forEach(archivo => {
        formularioDeDatos.append('files', archivo);
      });
      this.archivo.nombre = id;
      this.archivo.tipo = this.tipo;
      console.log(this.archivo);

      if (this.archivo.nombreArchivo !== null) {

        this.http.post(this.url + '/proyectoDAW/subirfichero.php', this.archivo).subscribe((res: any) => {

          console.log('Respuesta del servidor', res);
          this.appService.presentToast('success', 'Se ha modificado correctamente');

          this.cargarUsuario();
        //  window.location.href = window.location.protocol + '//' + window.location.host + '/tabs/tab1';
        });
      } else {
        //window.location.href = window.location.protocol + '//' + window.location.host + '/tabs/tab1';

      }
    } catch (e) {
      console.log(e);

    }
  }
}
