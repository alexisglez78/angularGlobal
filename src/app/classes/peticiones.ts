import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
// import { LoginService } from '../services/login.service';

@Injectable({
    providedIn: 'root'
})

export class Peticiones {

    token: string;

    constructor(private http: HttpClient) {
        this.token = localStorage.getItem('token');
    }

    public getQuery(query: string, tipo: string, body?: any) {
        const m = new Md5();
        const URL = `https://sistema.globalpaq.mx/api/v0/${query}`;
        let correo = 'silverzero55@gmail.com';
        // let correo = 'leticia.rivera@centercom.mx';
        // let password = '3a8a3d101a60d8}c4776506ce68555163';
        let password = m.appendStr('vargas').end();
        const headers = new HttpHeaders({
            'Authorization': `${this.token}`
        });
        switch (tipo) {
            case "GET":
                return this.http.get(URL, { headers });
            case "POST":
                return this.http.post(URL, body, { headers });
            case "PUT":
                return this.http.put(URL, body, { headers });
            case "DELETE":
                return this.http.delete(URL, { headers });
        }
    }

    public sendFileQuery(query: string, body: any, content = 'multipart/form-data', accept: string = 'application/json') {
        const m = new Md5();
        const URL = `https://sistema.globalpaq.mx/api/v0/${query}`;
        let correo = 'silverzero55@gmail.com';
        let password = m.appendStr('vargas').end();

        const headers = new HttpHeaders({
            'Authorization': `${this.token}`,
            // 'Content-Type': `${content}`,
            // 'Accept': `${accept}`
        });
        return this.http.post(URL, body, { headers });
    }

    public getFileQuery(query: string, tipo: string) {
        const m = new Md5();
        const URL = `https://sistema.globalpaq.mx/api/v0/${query}`;
        let correo = 'silverzero55@gmail.com';
        let password = m.appendStr('vargas').end();
        // let correo = 'cesarcln@hotmail.com';
        // let password = 'd2fe45381113bf1a6e68c6af4fd0f559';

        const headers = new HttpHeaders({
            'Authorization': `${this.token}`,
            'Content-Type': 'application/vnd.ms-excel',
            'Accept': 'application/vnd.ms-excel',

        });
        switch (tipo) {
            case "GET":
                return this.http.get(URL, { headers, responseType: 'blob' });
            case "POST":
                return this.http.post(URL, { headers, responseType: 'blob' });
        }
    }

}

