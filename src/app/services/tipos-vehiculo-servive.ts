import { Injectable } from '@angular/core';
import { TipoVehiculo, TiposVehiculoConsulta } from '../interfaces/tipos-vehiculo';
import { RespuestaProceso } from '../interfaces/respuesta-proceso';

@Injectable({
  providedIn: 'root',
})
export class TiposVehiculoService {

    urlApi = 'https://localhost:7263/api/tiposvehiculo';
    status = '';

    constructor() { }

    async Get(consulta: TiposVehiculoConsulta): Promise<RespuestaProceso> {
        let url = this.urlApi + '?';
        
        if(consulta.Id!=null) {
            url += '&Id=' + consulta.Id;
        }        

        console.log('[TiposVehiculoService.Get()]: Invocando ', url);
        const data = await fetch(url);
        return await data.json() ?? [];
      }

    async Post(registro: TipoVehiculo): Promise<RespuestaProceso> {
        let url = this.urlApi;

        console.log('[TiposVehiculoService.Post()]: Invocando ', url)        

        const data = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registro)
        });

        return await data.json() ?? [];        

    }
       
}