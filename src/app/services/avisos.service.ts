import { Injectable } from '@angular/core';
import { Peticiones } from '../classes/peticiones';
import { LoginService } from './login.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AvisosService {

  constructor(private app: Peticiones, private wsLogin: LoginService) { }


  setAviso(info) {
    this.wsLogin.validarLogin();
    return this.app.getQuery('public/avisos', "POST", info).pipe(map((data: any) => {
      return data;
    }));
  }

  getAviso(cantidad,pagina,search) {
    this.wsLogin.validarLogin();
    return this.app.getQuery(`public/avisos?cantidad=${cantidad}&pagina=${pagina}&search=${search}`, "GET").pipe(map((data: any) => {
      return data;
    }));
  }

  deleteAviso(id){
    this.wsLogin.validarLogin();
    return this.app.getQuery(`public/avisos?id=${id}`, "DELETE").pipe(map((data: any) => {
      return data;
    }));
  }
  updateAviso(info){
    this.wsLogin.validarLogin();
    return this.app.getQuery('public/avisos','PUT',info).pipe(map((data:any) => {
      return data
    }));
  }
}
