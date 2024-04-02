import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { VehiculosService } from '../services/vehiculos-service';
import { TiposVehiculoService } from '../services/tipos-vehiculo-servive';
import { Vehiculo } from '../interfaces/vehiculos';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculos-details.component.html',
  styleUrls: ['./vehiculos-details.component.css']
})
export class VehiculosDetailsComponent implements OnInit {
  
  vehiculo: Vehiculo | undefined;
  tiposVehiculo: any[] | null = null; 

  titulo: string = "";
  textoBtnActualizar: string = "";
  msgError: string | null = null;

  constructor(private vehiculosService: VehiculosService,
    private tiposVehiculoService: TiposVehiculoService,
    private route: ActivatedRoute,
    private location: Location) {

  }

  ngOnInit(): void {

    const id = parseInt(this.route.snapshot.params['id']);
      
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

    this.CargarListas();
    this.CargarRegistro(id);  
  
  }

  CargarListas() {
    this.tiposVehiculoService.Get({}).then(t=> {
      if(t.IdEstado! != 0 ) {
        this.msgError = t.DsEstado;
      } else {
        this.tiposVehiculo = t.Datos;
        this.tiposVehiculo?.unshift({ Id: '0', Nombre: '(Todos)' });
      }      
    });
  }

  CargarRegistro(id: number) {

    if (id!=0) {
            
      this.vehiculosService.Get({Id: Math.abs(id)}).then(t => {

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