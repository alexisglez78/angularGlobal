import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Peticiones } from '../classes/peticiones';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AsociadoService {

  constructor(private app: Peticiones, private wsLogin: LoginService) { }

  getInfoAsociado() {
    this.wsLogin.validarLogin();
    return this.app.getQuery('public/asociado/info', "GET").pipe(map((data: any) => {
      if (data.data.nombreU == "EMANUEL VARGAS GOMEZ") {
        data.data.nombreU = "DANIELA HERNANDEZ ORTIZ";
        data.data.correoU = "coordinacion.comercial@globalpaq.com";
      }
      return data.data;
    }));
  }

  setInfoAsociado(info) {
    this.wsLogin.validarLogin();
    return this.app.getQuery('public/asociado/info', "POST", info).pipe(map((data: any) => {
      return data.data;
    }));
  }

  validarTelefono(telefono) {
    this.wsLogin.validarLogin();
    return this.app.getQuery(`public/asociado/info/telefono?numero=${telefono}`, "GET").pipe(map((data: any) => {
      return data.data;
    }));
  }

  validarCodigo(datos) {
    this.wsLogin.validarLogin();
    return this.app.getQuery(`public/asociado/info/verificacion?codigo=${datos.codigo}&tipo=${datos.tipo}`, 'GET').pipe(map((data: any) => {
      return data.data;
    }));
  }

  getEstadoCuenta(cantidad, pagina) {
    this.wsLogin.validarLogin();
    return this.app.getQuery(`public/asociado/info/cuenta?cantidad=${cantidad}&pagina=${pagina}`, 'GET').pipe(map((data: any) => {
      return data;
    }));
  }
  getTips() {
    this.wsLogin.validarLogin();
    return this.app.getQuery(`public/tips`, 'GET').pipe(map((data: any) => {
      return data;
    }));
  }

}
