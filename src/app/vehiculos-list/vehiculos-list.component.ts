import { Component, OnInit } from '@angular/core';
import { VehiculosConsulta } from '../interfaces/vehiculos';
import { VehiculosService } from '../services/vehiculos-service';
import { RespuestaProceso } from '../interfaces/respuesta-proceso'


@Component({
  selector: 'app-vehiculos-list',
  templateUrl: './vehiculos-list.component.html',
  styleUrls: ['./vehiculos-list.component.css']
})
export class VehiculosListComponent implements OnInit {

  consulta: VehiculosConsulta = {
                                  RegistrosPagina: 5,
                                  NumeroPagina: 1
                                }

  lista:any = [];
  msgError: string | null = null;
  
  constructor(private VehiculosService: VehiculosService) {
  }
  
  ngOnInit(): void {

    let tmp = localStorage.getItem('VehiculosConsulta');
    if (tmp != null) {
      this.consulta = JSON.parse(tmp);
    }

    this.Consultar();    
  }  

  Consultar(Ordenar:string=''):void {

    this.msgError = null;

    if(Ordenar.length > 0) {
      if(this.consulta.Ordenar == Ordenar) {
        this.consulta.Ordenar = Ordenar + ' DESC';
      } else {
        this.consulta.Ordenar = Ordenar;
      }
    }

    //convertir a null, parámetros sin valor    
    if(String(this.consulta.Id).length==0) {
      this.consulta.Id = null;
    }

    if(String(this.consulta.IdTipoVehiculo).length==0) {
      this.consulta.IdTipoVehiculo = null;
    }    

    if(String(this.consulta.IdModeloVersion).length==0) {
      this.consulta.IdModeloVersion = null;
    }
    
    if(String(this.consulta.IdColorVehiculo).length==0) {
      this.consulta.IdColorVehiculo = null;
    }
    
    if(String(this.consulta.IdSucursalConcesionario).length==0) {
      this.consulta.IdSucursalConcesionario = null;
    }

    if(String(this.consulta.Patente).length==0) {
      this.consulta.Patente = null;
    }

    if(String(this.consulta.FecCreacionDesde).length==0) {
      this.consulta.FecCreacionDesde = null;
    }

    if(String(this.consulta.FecCreacionHasta).length==0) {
      this.consulta.FecCreacionHasta = null;
    }     
    
    if(String(this.consulta.Ordenar).length==0) {
      this.consulta.Ordenar = null;
    }    

    this.VehiculosService.Get(this.consulta).then((respuestaProceso:RespuestaProceso)=> {
      if(respuestaProceso.IdEstado! != 0 ) {
        this.msgError = respuestaProceso.DsEstado;
        return;
      }

      this.lista = respuestaProceso.Datos;
    });

    localStorage.setItem('VehiculosConsulta', JSON.stringify(this.consulta));
  }

  AvanzarPagina() {
    this.consulta.NumeroPagina! ++;
    this.Consultar();
  }

  RetrocederPagina() {
    this.consulta.NumeroPagina! --;
    this.Consultar();
  }

  PrimeraPagina() {
    this.consulta.NumeroPagina! = 1;
    this.Consultar();
  }

  Limpiar():void {
    this.msgError = null;
    this.consulta.Id = null;
    this.consulta.IdTipoVehiculo = null;
    this.consulta.IdModeloVersion = null;
    this.consulta.IdColorVehiculo = null;
    this.consulta.IdSucursalConcesionario = null;
    this.consulta.Patente = null;
    this.consulta.FecCreacionDesde = null;
    this.consulta.FecCreacionHasta = null;
    this.consulta.Ordenar = null;
  };
}
