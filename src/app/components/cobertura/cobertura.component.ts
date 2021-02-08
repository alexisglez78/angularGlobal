import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalpaqService } from 'src/app/services/globalpaq.service';

@Component({
  selector: 'app-cobertura',
  templateUrl: './cobertura.component.html',
  styleUrls: ['./cobertura.component.css']
})
export class CoberturaComponent implements OnInit {

  forma: FormGroup;
  loading: boolean = false;
  view: boolean = false;
  cobFedex:any;
  cobDhl:any;
  cobEstafeta:any;
  carga:boolean = false;
  error:boolean = false;

  constructor(private gp: GlobalpaqService) {
    this.forma = new FormGroup({
      'origen': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'destino': new FormControl('', [Validators.required, Validators.minLength(5)])
    });
    this.carga = true;
  }

  ngOnInit() {
  }

  getCobertura(){
    this.loading = true;
    this.view = false;
    this.error = false;
    console.log('enviando...', this.forma.value);
    this.gp.getCobertura(this.forma.value.origen, this.forma.value.destino, 'fedex').subscribe((data:any) => {
      console.log(data);
      if(data.error){
        this.loading = false;
        this.error = true;
        return;
      }
      this.cobFedex = data.data;
      this.loading = false;
      this.view = true;
    });
    this.gp.getCobertura(this.forma.value.origen, this.forma.value.destino, 'dhl').subscribe((data:any) => {
      console.log(data);
      if(data.data.message){
        return;
      }
      this.cobDhl = data.data;
    });
    this.gp.getCobertura(this.forma.value.origen, this.forma.value.destino, 'estafeta').subscribe((data:any) => {
      console.log(data);
      if(data.data.message){
        return;
      }
      this.cobEstafeta = data.data;
    });
  }

}
