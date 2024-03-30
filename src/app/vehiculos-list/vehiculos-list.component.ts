import { Component } from '@angular/core';
import { VehiculosConsulta } from '../interfaces/vehiculos';
import { VehiculosService } from '../services/vehiculos-service';
import { RespuestaProceso } from '../interfaces/respuesta-proceso'


@Component({
  selector: 'app-vehiculos-list',
  templateUrl: './vehiculos-list.component.html',
  styleUrls: ['./vehiculos-list.component.css']
})
export class VehiculosListComponent {

  VehiculosConsulta: VehiculosConsulta = {
                                          Id:null,
                                          IdTipoVehiculo: null,
                                          IdModeloVersion: null,
                                          IdColorVehiculo: null,
                                          IdSucursalConcesionario: null,
                                          Patente: null,
                                          FecCreacionDesde: null,
                                          FecCreacionHasta: null,
                                          Ordenar: null,
                                          RegistrosPagina: 5,
                                          NumeroPagina: 1
                                         }

  data:any = [];
  msgError: string | null = null;
  
  constructor(private VehiculosService: VehiculosService) {
  }
  
  VehiculosGet(Ordenar:string=''):void {

    this.msgError = null;

    if(Ordenar.length > 0) {
      if(this.VehiculosConsulta.Ordenar == Ordenar) {
        this.VehiculosConsulta.Ordenar = Ordenar + ' DESC';
      } else {
        this.VehiculosConsulta.Ordenar = Ordenar;
      }
    }

    //convertir a null, parámetros sin valor    
    if(String(this.VehiculosConsulta.Id).length==0) {
      this.VehiculosConsulta.Id = null;
    }

    if(String(this.VehiculosConsulta.IdTipoVehiculo).length==0) {
      this.VehiculosConsulta.IdTipoVehiculo = null;
    }    

    if(String(this.VehiculosConsulta.IdModeloVersion).length==0) {
      this.VehiculosConsulta.IdModeloVersion = null;
    }
    
    if(String(this.VehiculosConsulta.IdColorVehiculo).length==0) {
      this.VehiculosConsulta.IdColorVehiculo = null;
    }
    
    if(String(this.VehiculosConsulta.IdSucursalConcesionario).length==0) {
      this.VehiculosConsulta.IdSucursalConcesionario = null;
    }

    if(String(this.VehiculosConsulta.Patente).length==0) {
      this.VehiculosConsulta.Patente = null;
    }

    if(String(this.VehiculosConsulta.FecCreacionDesde).length==0) {
      this.VehiculosConsulta.FecCreacionDesde = null;
    }

    if(String(this.VehiculosConsulta.FecCreacionHasta).length==0) {
      this.VehiculosConsulta.FecCreacionHasta = null;
    }     
    
    if(String(this.VehiculosConsulta.Ordenar).length==0) {
      this.VehiculosConsulta.Ordenar = null;
    }    

    this.VehiculosService.VehiculosGet(this.VehiculosConsulta).then((respuestaProceso:RespuestaProceso)=> {
      if(respuestaProceso.IdEstado! != 0 ) {
        this.msgError = respuestaProceso.DsEstado;
        return;
      }

      this.data = respuestaProceso.Datos;

    });

    //localStorage.setItem('VehiculoConsulta', JSON.stringify(this.VehiculosConsulta));
  }

  AvanzarPagina() {
    this.VehiculosConsulta.NumeroPagina! ++;
    this.VehiculosGet();
  }

  RetrocederPagina() {
    this.VehiculosConsulta.NumeroPagina! --;
    this.VehiculosGet();
  }

  Limpiar():void {
    this.msgError = null;
    this.VehiculosConsulta.Id = null;
    this.VehiculosConsulta.IdTipoVehiculo = null;
    this.VehiculosConsulta.IdModeloVersion = null;
    this.VehiculosConsulta.IdColorVehiculo = null;
    this.VehiculosConsulta.IdSucursalConcesionario = null;
    this.VehiculosConsulta.Patente = null;
    this.VehiculosConsulta.FecCreacionDesde = null;
    this.VehiculosConsulta.FecCreacionHasta = null;
    this.VehiculosConsulta.Ordenar = null;
  };
}
