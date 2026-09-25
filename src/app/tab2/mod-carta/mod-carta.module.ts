import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Tab1PageRoutingModule } from 'src/app/tab1/tab1-routing.module';
import { Tab2PageRoutingModule } from '../tab2-routing.module';
import { ModCartaComponent } from './mod-carta/mod-carta.component';
import { AnadirContenidoComponent } from './anadir-contenido/anadir-contenido.component';
import { ModificarMenuComponent } from 'src/app/tab2/mod-carta/modificar-menu/modificar-menu.component';



@NgModule({
  declarations: [ModCartaComponent,AnadirContenidoComponent,ModificarMenuComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule,
    HttpClientModule,
  ],
  exports: [ModCartaComponent],
})
export class ModCartaModule { }
