import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Peticiones } from '../classes/peticiones';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ReclamosService {

  constructor(private app:Peticiones, private wsLogin: LoginService) { }

  getReclamos(cantidad, pagina){
    this.wsLogin.validarLogin();
    return this.app.getQuery(`public/reclamos?cantidad=${cantidad}&pagina=${pagina}`, 'GET').pipe(map((data:any) => {
      return data;
    }));
  }

  postReclamos(data){
    this.wsLogin.validarLogin();
    return this.app.getQuery('public/reclamos' , 'POST', data).pipe(map((data:any) => {
      return data;
    }));
  }

  getDirecciones(paq, tracking){
    this.wsLogin.validarLogin();
    return this.app.getQuery(`public/reclamos/direcciones?paq=${paq}&tracking=${tracking}`, 'GET').pipe(map((data:any) => {
      return data.data;
    }))
  }

  getTiposReclamos(tipo){
    this.wsLogin.validarLogin();
    return this.app.getQuery(`public/reclamos/tipos/${tipo}`, 'GET').pipe(map((data:any) => {
      return data.data;
    }));
  }
}
