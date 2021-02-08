import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutinfo'
})
export class CutinfoPipe implements PipeTransform {

  transform(value: string): string {
    if(!value){
      return 'Usuario';
    }

    if(value.length > 15){
      let nuevotexto = value.substr(0, 15) + '...';
      return nuevotexto;
    }else{
      return value;
    }
  }

}
