import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiculosListComponent } from './vehiculos-list/vehiculos-list.component';
import { VehiculosDetailsComponent } from './vehiculos-details/vehiculos-details.component';

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
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
