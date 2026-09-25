import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModificarMenuComponent } from './mod-carta/modificar-menu/modificar-menu.component';
import { AnadirContenidoComponent } from './mod-carta/anadir-contenido/anadir-contenido.component';
import { Tab2Page } from './tab2.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
  },
  {
    path: 'anadirCarta/:tipo',
    component: AnadirContenidoComponent,
  },
  {
    path: 'modificar/:tipo/:id',
    component: ModificarMenuComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule { }
