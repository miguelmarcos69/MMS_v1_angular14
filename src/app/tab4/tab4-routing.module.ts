import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnadirUsuarioComponent } from './gestion/anadir-usuario/anadir-usuario.component';
import { AsignarMesasComponent } from './gestion/asignar-mesas/asignar-mesas.component';
import { ConfigComponent } from './gestion/config/config.component';
import { EstadisticasComponent } from './gestion/estadisticas/estadisticas.component';
import { HistorialMesasComponent } from './gestion/historial-mesas/historial-mesas.component';
import { ModClientesModComponent } from './gestion/mod-clientes-mod/mod-clientes-mod.component';
import { ModClientesComponent } from './gestion/mod-clientes/mod-clientes.component';
import { ModIngreModComponent } from './gestion/mod-ingre-mod/mod-ingre-mod.component';
import { ModIngreComponent } from './gestion/mod-ingre/mod-ingre.component';
import { ModUsuariosModComponent } from './gestion/mod-usuarios-mod/mod-usuarios-mod.component';
import { ModUsuariosComponent } from './gestion/mod-usuarios/mod-usuarios.component';
import { Tab4Page } from './tab4.page';

const routes: Routes = [
  {
    path: '',
    component: Tab4Page,
  },
  {
    path: 'asignarMesas',
    component: AsignarMesasComponent,
  },
  {
    path: 'modIngre',
    component: ModIngreComponent,
  },
  {
    path: 'modIngre/:id',
    component: ModIngreModComponent,
  },
  {
    path: 'modClientes',
    component: ModClientesComponent,
  },
  {
    path: 'modClientes/:id',
    component: ModClientesModComponent,
  },
  {
    path: 'modClientes/:id/:rec',
    component: ModClientesComponent,
  },
  {
    path: 'modUsu',
    component: ModUsuariosComponent,
  },
  {
    path: 'modUsu/:id',
    component: ModUsuariosModComponent,
  },
  {
    path: 'modUsu/:id/:rec',
    component: ModUsuariosComponent,
  },
  {
    path: 'anaUsu',
    component: AnadirUsuarioComponent,
  },
  {
    path: 'estadisticas',
    component: EstadisticasComponent,
  },
  {
    path: 'historial',
    component: HistorialMesasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab4PageRoutingModule { }
