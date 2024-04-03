import { RespuestaProceso } from '../interfaces/respuesta-proceso';

export class ApiService {

    urlBase = 'https://localhost:7263/api/'; 
    controller: string;
    status = '';

    constructor(_controller: string) {        
        this.controller = _controller;
    }

    public async Get(consulta: any): Promise<RespuestaProceso> {
        let url = this.urlBase + this.controller + '?';
        
        const propiedades = Object.keys(consulta);

        for (const propiedad of propiedades) {
            if (consulta[propiedad]!=null) {
                url += `&${propiedad}=${consulta[propiedad]}`
            }
        }

        // if(consulta.Id!=null) {
        //     url += '&Id=' + consulta.Id;
        // }        

        console.log('[ApiService(' + this.controller + ').Get()]: Invocando ', url);
        const data = await fetch(url);
        return await data.json() ?? [];
      }

    public async Post(registro: any): Promise<RespuestaProceso> {
        let url = this.urlBase + this.controller;

        console.log('[ApiService(' + this.controller + ').Post()]: Invocando ', url)        

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