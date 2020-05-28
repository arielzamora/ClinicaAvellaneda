import { Component, OnInit,Input,Output,EventEmitter, OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from "../../services/auth.service";
import { usuario } from "src/app/model/usuario";
import { Router } from '@angular/router';
//import { ReCaptcha2Component } from 'ngx-captcha';

import {AngularFireStorage}from '@angular/fire/storage';
import {finalize}from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit ,OnDestroy{
  focus;
  focus1;
  focus2;
  public form: FormGroup;
  public error: boolean;
  public errorMessage: string;
  user:usuario;
  isLogueado:boolean;
  constructor(private fb: FormBuilder, public authService:AuthService,private router:Router,private fireStore:AngularFireStorage) {
    this.form = this.fb.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }


  CargarDefault(tipo: string) {
    let dataLogin: Object = null;
    switch (tipo) {
      case 'A':
        dataLogin = {
          Email: 'admin@admin.com',
          Password: '123456'
        };
        this.form.setValue(dataLogin);
      break;
      case 'P':
          dataLogin = {
            Email: 'paciente@paciente.com',
            Password: '123456'
          };
      this.form.setValue(dataLogin);
      break;
      case 'E':
            dataLogin = {
              Email: 'profesional@profesional.com',
              Password: '123456'
            };
       this.form.setValue(dataLogin);
      break;
    }
  }

  public Ingresar(): void {
    this.errorMessage = '';
    this.error = false;
    if (this.form.valid) {
      localStorage.clear();

      this.user=new usuario();
      this.user.usuario= this.form.get('Email').value
      this.user.password=this.form.get('Password').value

      this.authService.Loguear(this.user)
        .then(response => {
          if(response){
            this.router.navigate(['/bienvenida']);
          }
          }
        )
        .catch(
          response => {
            this.error = true;
            this.isLogueado=false;
            this.errorMessage = response.message;
          }
        );
    } else {
      this.errorMessage = 'Debe completar los campos correctamente.';
      this.error = true;
    }
  }


  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }
}
 