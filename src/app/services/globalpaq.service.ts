import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Peticiones } from '../classes/peticiones';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalpaqService {

  constructor(private app:Peticiones, private wsLogin:LoginService) {
    
  }

  getGuiasDisponiblesFedex() {
    this.wsLogin.validarLogin();
    return this.app.getQuery('public/fedex/disponibles', "GET").pipe(map((data: any) => {
      return {
        diaSig: data.data.filter(guia => guia.descripcion.indexOf('DIA SIG') >= 0 && guia.disponibles > 0),
        terrestre: data.data.filter(guia => guia.descripcion.indexOf('TERR') >= 0 && guia.disponibles > 0)
      }
    }));
  }
  getGuiasDisponiblesDhl() {
    this.wsLogin.validarLogin();
    return this.app.getQuery('public/dhl/disponibles', "GET").pipe(map((data: any) => {
      // console.log(data);
      return {
        diaSig: data.data.filter(guia => guia.descripcion.indexOf('DIA SIG') >= 0 && guia.disponibles > 0),
        terrestre: data.data.filter(guia => guia.descripcion.indexOf('TERR') >= 0 && guia.disponibles > 0)
      }
    }));
  }
  getGuiasDisponiblesEstafeta() {
    this.wsLogin.validarLogin();
    return this.app.getQuery('public/estafeta/disponibles', "GET").pipe(map((data: any) => {
      return {
        diaSig: data.data.filter(guia => guia.descripcion.indexOf('DIA SIG') >= 0 && guia.disponibles > 0),
        terrestre: data.data.filter(guia => guia.descripcion.indexOf('TERR') >= 0 && guia.disponibles > 0)
      }
    }));
  }
  getGuiasDisponiblesRedpack() {
    this.wsLogin.validarLogin();
    return this.app.getQuery('public/redpack/disponibles', "GET").pipe(map((data: any) => {
      return {
        diaSig: data.data.filter(guia => guia.descripcion.indexOf('DIA SIG') >= 0 && guia.disponibles > 0),
        terrestre: data.data.filter(guia => guia.descripcion.indexOf('TERR') >= 0 && guia.disponibles > 0)
      }
    }));
  }

  getHistorial(dias = 0, fechaInicio = '', fechaFin = '', paqueteria = 'fedex') {
    this.wsLogin.validarLogin();
    if (dias > 0) {
      return this.app.getQuery(`public/${paqueteria}/historial?tipo=2&dia=${dias}`, "GET").pipe(map((data: any) => {
        return data.data;
      }));
    } else if (fechaInicio != '' && fechaFin != '') {
      return this.app.getQuery(`public/${paqueteria}/historial?tipo=2&fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`, "GET").pipe(map((data: any) => {
        return data.data;
      }));
    } else {
      return this.app.getQuery(`public/${paqueteria}/historial`, "GET").pipe(map((data: any) => {
        return data.data;
      }));
    }
  }


  getStatusTracking(tracking, paqueteria) {
    this.wsLogin.validarLogin();
    return this.app.getQuery(`public/${paqueteria}/tracking/${tracking}`, "GET").pipe(map((data: any) => {
      return data.data;
    }))
  }

  cancelarGuia(tracking, paqueteria) {
    this.wsLogin.validarLogin();
    return this.app.getQuery(`public/${paqueteria}/cancelar/${tracking}`, "GET").pipe(map((data: any) => {
      return data.data;
    }));
  }

  getHistorialFile(dias = 0, fechaInicio = '', fechaFin = '', paqueteria = 'fedex') {
    this.wsLogin.validarLogin();
    if (dias > 0) {
      return this.app.getFileQuery(`public/${paqueteria}/historial/file?tipo=2&dia=${dias}`, "GET");
    } else if (fechaInicio != '' && fechaFin != '') {
      return this.app.getFileQuery(`public/${paqueteria}/historial/file?tipo=2&fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`, "GET");
    } else {
      return this.app.getFileQuery(`public/${paqueteria}/historial/file`, "GET");
    }
  }

  getMovimientos(cantidad: number,pagina: number, paqueteria: string){
    this.wsLogin.validarLogin();
    return this.app.getQuery(`public/${paqueteria}/asignaciones?cantidad=${cantidad}&pagina=${pagina}`, 'GET').pipe(map((data:any) => {
      return data;
    }));
  }

  getCobertura(origen:string, destino:string, paqueteria:string){
    this.wsLogin.validarLogin();
    return this.app.getQuery(`public/${paqueteria}/cobertura?cp_origen=${origen}&cp_destino=${destino}`, 'GET').pipe(map((data:any) => {
      return data;
    }));
  }

  generateTracking(paqueteria: string, data:any ){
    this.wsLogin.validarLogin();
    return this.app.getQuery(`public/${paqueteria}/guia`, 'POST', data).pipe(map((data:any) => {
      return data;
    }));
  }

  generateRecoleccion(paqueteria: string,data:any){
    this.wsLogin.validarLogin();
    return this.app.getQuery(`public/${paqueteria}/recoleccion`, 'POST', data).pipe(map((data:any) => {
      return data;  
    }));  
  }

  sendGuiaByEmail(link, email){
    this.wsLogin.validarLogin();
    return this.app.getQuery(`public/guia/email?link=${link}&email=${email}`, 'GET').pipe(map((data:any) => {
        return data;
    }));
  }


}
