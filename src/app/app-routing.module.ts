import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiculosListComponent } from './vehiculos-list/vehiculos-list.component';
import { VehiculosDetailsComponent } from './vehiculos-details/vehiculos-details.component';
import { GeneralListComponent } from './general-list/general-list.component';
import { GeneralDetailsComponent } from './general-details/general-details.component';


const routes: Routes = [
  {
      path: '',
      component: VehiculosListComponent,
      title: 'Listado Vehículos'
  },  
  {
    path: 'vehiculos',
    component: VehiculosListComponent,
    title: 'Listado Vehículos'
  },
  {
    path: 'vehiculo/:id',
    component: VehiculosDetailsComponent,
    title: 'Detalle Vehiculo'
  },  
  {
    path: 'list',
    component: GeneralListComponent,
    title: 'Listado'
  },
  {
    path: 'details/:tipo/:id',
    component: GeneralDetailsComponent,
    title: 'Detalle'
  },  
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
