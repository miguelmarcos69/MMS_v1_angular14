import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Tab1PageRoutingModule } from 'src/app/tab1/tab1-routing.module';
import { Tab4PageRoutingModule } from '../tab4-routing.module';

import { AsignarMesasComponent } from './asignar-mesas/asignar-mesas.component';
import { ModIngreComponent } from './mod-ingre/mod-ingre.component';
import { GestionComponent } from 'src/app/tab4/gestion/gestion/gestion.component';
import { ModIngreModComponent } from './mod-ingre-mod/mod-ingre-mod.component';
import { ModClientesComponent } from './mod-clientes/mod-clientes.component';
import { ModClientesModComponent } from './mod-clientes-mod/mod-clientes-mod.component';
import { ModUsuariosComponent } from './mod-usuarios/mod-usuarios.component';
import { ModUsuariosModComponent } from './mod-usuarios-mod/mod-usuarios-mod.component';
import { AnadirUsuarioComponent } from './anadir-usuario/anadir-usuario.component';
import { NgChartsModule } from 'ng2-charts';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HistorialMesasComponent } from './historial-mesas/historial-mesas.component';


@NgModule({
  declarations: [GestionComponent, AsignarMesasComponent, ModIngreComponent, ModIngreModComponent, ModClientesComponent,
    ModClientesModComponent, ModUsuariosComponent, ModUsuariosModComponent, AnadirUsuarioComponent,
    HistorialMesasComponent,EstadisticasComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab4PageRoutingModule,
    HttpClientModule,
    NgChartsModule


  ],
  exports: [GestionComponent],
})
export class GestionModule { }
