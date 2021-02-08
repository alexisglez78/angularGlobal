import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Peticiones } from '../classes/peticiones';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor(private app:Peticiones ,private wsLogin: LoginService) { }

  getTokens(cantidad,pagina){
    this.wsLogin.validarLogin();
    return this.app.getQuery(`public/utils/token?cantidad=${cantidad}&pagina=${pagina}`, 'GET').pipe(map((data:any) => {
      return data;
    }));

  }
  deleteToken(id){
    this.wsLogin.validarLogin();
    return this.app.getQuery(`public/utils/token?idtoken=${id}`, 'DELETE').pipe(map((data:any) => {
      return data;
    }));            
  }
  createToken(nombre:any){
    // console.log(params);
    this.wsLogin.validarLogin();
    return this.app.getQuery(`public/utils/token`,'POST',nombre).pipe(map((data:any) => {
      return data;
    }));  
  }
}
