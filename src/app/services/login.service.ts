import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Peticiones } from '../classes/peticiones';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute} from '@angular/router/';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token: string;
  loginView: boolean = false;

  constructor(private http: HttpClient, private app: Peticiones, private router: Router, private active: ActivatedRoute) { }

  login(correo, password) {
    return this.app.getQuery('public/asociado/login', 'POST', { correo, password }).pipe(map((data: any) => {
      if (data.data.message) {
        return data.data;
      }
      this.token = data.data.token;
      localStorage.setItem('token', this.token);
      this.loginView = true;
      window.location.href = '/inicio';
      return data.data;
    }));
  }

  nuevoToken(token) {
    return this.app.getQuery('public/asociado/token', 'POST', { token }).pipe(map((data: any) => {
      return data.data;
    }));
  }

  validarLogin() {
    // console.log('token', localStorage.getItem('token'));
    if (localStorage.getItem('token') !== null) {
      this.loginView = true;
      let hoy = Math.floor(Date.now() / 1000);
      let payload = this.parseJwt(localStorage.getItem('token'));
      environment.idasociado = payload.data.id;
      environment.nombre = payload.data.name;
      // console.log(payload);
      // console.log(hoy - payload.exp);
      if ((hoy - payload.exp) >= -10) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        return;
      }
      // console.log(payload);
      if ((hoy - payload.exp) >= -200) {
        this.nuevoToken(localStorage.getItem('token')).subscribe((data: any) => {
          // console.log(data);
          if (data.message) {
            localStorage.removeItem('token');
            window.location.href = '/login';
            return;
          }
          localStorage.setItem('token', data.token);
        });
        return;
      }
      this.router.events.subscribe((event: any) => {
        if (event.url === '/login' || event.url === '/') {
          this.router.navigate(['inicio']);
        }
      });
      
    } else {
      this.router.navigate(['login']);
      // window.location.href = 'login';
    }

  }

  expiroToken(){

  }

  parseJwt(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };
}
