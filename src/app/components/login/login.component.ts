import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  forma: FormGroup;
  error:boolean = false;
  message:string;

  constructor(private wsLogin:LoginService) {
    this.forma = new FormGroup({
      'correo' : new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
   }

  ngOnInit() {
  }

  login(){
    console.log(this.forma);
    this.wsLogin.login(this.forma.value.correo, this.forma.value.password).subscribe((data:any) => {
      console.log(data);
      if(data.message){
        this.error = true;
        this.message = data.message;
        this.forma.reset();
        return;
      }
      this.error = false;
      this.wsLogin.validarLogin();
      this.wsLogin.loginView = false;
    });
  }

}
