import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { VehiculosService } from '../services/vehiculos-service';
import { Vehiculo, VehiculosConsulta } from '../interfaces/vehiculos';
import { Utiles } from '../services/utiles';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculos-details.component.html',
  styleUrls: ['./vehiculos-details.component.css']
})
export class VehiculosDetailsComponent {

  vehiculo: Vehiculo | undefined;
  data:any = [];
  titulo: string = "";
  textoBtnActualizar: string = "";
  msgError: string | null = null;

  constructor(private vehiculosService: VehiculosService,
    private route: ActivatedRoute,
    private location: Location,
    private utiles: Utiles) {

    const id = parseInt(this.route.snapshot.params['id']);
    this.cargarRegistro(id);
    

    if(id==0) {
       this.titulo = "Crear nuevo vehículo"
       this.textoBtnActualizar = "Crear"
    }

    if(id>0) { 
      this.titulo = "Detalle vehículo [" + id.toString() + "]"  
      this.textoBtnActualizar = "Actualizar"
    }

    if(id<0) { 
      this.titulo = "Eliminar vehiculo [" + Math.abs(id).toString() + "]"  
      this.textoBtnActualizar = "Eliminiar"    
    }
  }

  cargarRegistro(id: number) {

    if (id!=0) {

      const vc: VehiculosConsulta = {Id: Math.abs(id)};
            
      this.vehiculosService.Get(vc).then(t => {

        if(t.IdEstado != 0 ) {
          this.msgError = t.DsEstado;
          return;
        }

        if (t.Datos!=null) {
          this.vehiculo = t.Datos[0];          
          if(this.vehiculo) { this.vehiculo.Id = id; }
        }
        
      })

    } else {
      this.vehiculo = { Id:0}
    };
  }

  Actualizar() {    
    this.vehiculosService.Post(this.vehiculo!).then(t=> {
      if(t.IdEstado != 0 ) {        
        this.msgError = t.DsEstado;
      } else {
        this.location.back();
      }     
    })    
  }

  goBack(): void {
    this.location.back();
  }  
  
}