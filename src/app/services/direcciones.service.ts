import { Injectable } from '@angular/core';
import { Peticiones } from '../classes/peticiones';
import { LoginService } from './login.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DireccionesService {

  constructor(private app:Peticiones, private wsLogin:LoginService) { }

  getCp(cp:string, paqueteria:string){
    this.wsLogin.validarLogin();
    return this.app.getQuery(`public/${paqueteria}/cp/${cp}`, 'GET').pipe(map((data:any) => {
        return data.data;
    }));
  }

  searchDireccion(texto: string, paqueteria: string){
    this.wsLogin.validarLogin();
    return this.app.getQuery(`public/${paqueteria}/direccion/buscar/${texto}`, 'GET').pipe(map((data:any) => {
      return data.data;
    }))
  }

  setPredeterminado(iddireccion: number, tipo: string, paqueteria:string){
    this.wsLogin.validarLogin();
    return this.app.getQuery(`public/${paqueteria}/direccion/predeterminados`, 'PUT', {iddireccion, tipo}).pipe(map((data:any) => {
      return data;
    }));
  }

  eliminarPred(tipo: string, paqueteria: string){
    this.wsLogin.validarLogin();
    return this.app.getQuery(`public/${paqueteria}/direccion/predeterminados/${tipo}`, 'DELETE').pipe(map((data:any) => {
      return data;
    }))
  }

  getPredeterminados(paqueteria: string){
    this.wsLogin.validarLogin();
    return this.app.getQuery(`public/${paqueteria}/direccion/predeterminados`, 'GET').pipe(map((data:any) => {
      return data;
    }))
  }

  getRemitentes(paqueteria: string){
    this.wsLogin.validarLogin();
    return this.app.getQuery(`public/${paqueteria}/remitentes`, 'GET').pipe(map((data:any) => {
      return data;
    }));
  }


}
