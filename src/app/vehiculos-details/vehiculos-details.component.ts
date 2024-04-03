import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from '../services/api-service';
import { Vehiculo } from '../interfaces/vehiculos';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculos-details.component.html',
  styleUrls: ['./vehiculos-details.component.css']
})
export class VehiculosDetailsComponent implements OnInit {
  
  vehiculo: Vehiculo | undefined;
  tiposVehiculo: any[] | null = null;
  coloresVehiculo: any[] | null = null;
  sucursalesConcesionario: any[] | null = null;

  titulo: string = "";
  textoBtnActualizar: string = "";
  msgError: string | null = null;

  constructor(private route: ActivatedRoute,
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

    new ApiService('tiposvehiculo').Get({}).then(t=> {
      if(t.IdEstado! != 0 ) {
        this.msgError = t.DsEstado;
      } else {
        this.tiposVehiculo = t.Datos;
        this.tiposVehiculo?.unshift({ Id: '0', Nombre: '(seleccionar)' });
      }      
    });

    new ApiService('coloresvehiculo').Get({}).then(t=> {
      if(t.IdEstado! != 0 ) {
        this.msgError = t.DsEstado;
      } else {
        this.coloresVehiculo = t.Datos;
        this.coloresVehiculo?.unshift({ Id: '0', Nombre: '(seleccionar)' });
      }      
    });

    new ApiService('sucursalesconcesionario').Get({}).then(t=> {
      if(t.IdEstado! != 0 ) {
        this.msgError = t.DsEstado;
      } else {
        this.sucursalesConcesionario = t.Datos;
        this.sucursalesConcesionario?.unshift({ Id: '0', NombreCompleto: '(seleccionar)' });
      }      
    });    

  }

  CargarRegistro(id: number) {

    if (id!=0) {
      new ApiService('vehiculos').Get({Id: Math.abs(id)}).then(t=> {

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
    const api = new ApiService('vehiculos');
    api.Post(this.vehiculo!).then(t=> {
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