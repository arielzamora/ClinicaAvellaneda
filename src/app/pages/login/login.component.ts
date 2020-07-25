import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from "../../services/auth.service";
import { usuario } from "src/app/model/usuario";
import { Router } from '@angular/router';

import {AngularFireStorage}from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { ReCaptcha2Component } from 'ngx-captcha';
import { PacienteService } from 'src/app/services/paciente.service';
import { ProfesionalService } from 'src/app/services/profesional.service';
import { analytics } from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit ,OnDestroy{

  public form: FormGroup;
  public errorMessage: string;
  public error: boolean;
  public success: boolean;
  public muestroCaptcha: boolean;
  get f() { return this.form.controls; }
  submitted = false;
  user:usuario;
  isLogueado:boolean;
  public usuarios: Array<any>;
  existe:boolean=false;
  @ViewChild('captchaElem',{static:true}) captcha: ReCaptcha2Component;
  @ViewChild('inputEmail',{static:true}) inputEmail: ReCaptcha2Component;
  @ViewChild('inputPassword',{static:true}) inputPasword: ReCaptcha2Component;
  key:string;
  paciente:any;
  profesional:any;
  constructor(private fb: FormBuilder, 
    public authService:AuthService,
    private router:Router,
    private fireStore:AngularFireStorage,
    private AFauth :AngularFireAuth,
    private pacienteService:PacienteService,
    private profesioanService:ProfesionalService) {

    this.usuarios=this.authService.traerTodos();
    this.key = '6Le-Z78UAAAAABcjicZLxcZMuebY_chP-kDOHlWj';
  }

  public mostrarCaptcha()
  {
    if(this.muestroCaptcha){
      this.muestroCaptcha=false;
    }else
    {
      this.muestroCaptcha=true;
    }

  }
  CargarDefault(tipo: string) {
    let dataLogin: Object = null;
    switch (tipo) {
      case 'A':
        dataLogin = {
          email: 'admin@admin.com',
          password: '123456',
          recaptcha:''
        };
        this.form.setValue(dataLogin);
      break;
      case 'P':
          dataLogin = {
            email: 'jzamora@gmail.com',
            password: '123456',
            recaptcha:''
          };
      this.form.setValue(dataLogin);
      break;
      case 'P2':
        dataLogin = {
          email: 'gmorin@gmail.com',
          password: '123456',
          recaptcha:''
        };
    this.form.setValue(dataLogin);
    break;
      case 'E':
            dataLogin = {
              email: 'tsoros@cavellaneda.com',
              password: '123456',
              recaptcha:''
            };
       this.form.setValue(dataLogin);
      break;
      case 'E2':
        dataLogin = {
          email: 'azamora@cavellaneda.com',
          password: '123456',
          recaptcha:''
        };
   this.form.setValue(dataLogin);
  break;
    }
  }

  public Ingresar(): void {
    this.errorMessage = '';
    this.error = false;
    this.success = false;
    this.submitted=true;
    if (this.form.valid) {
      localStorage.clear();

      this.user=new usuario();
      this.user.usuario= this.form.get('email').value
      this.user.password=this.form.get('password').value

      this.authService.Loguear(this.user)
        .then(response=>{
          if(response){
            this.success = true;
            this.user.id=response.toString();
            this.guardarUsuario(this.user);
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
      this.isLogueado=false;
      this.errorMessage = 'Debe completar los campos correctamente.';
      this.error = true;
    }
  }

  public guardarUsuario(dataLogin: usuario)
  {

    
      this.usuarios.forEach(user=>{
        if((user.mail.toString()==dataLogin.usuario)&&(user.contraseña.toString()==dataLogin.password))
        {
          dataLogin.tipo=user.tipo;
          dataLogin.nombre=user.nombre;
            //obtengo la lista de usuarios y si se encuenta logeo por email y password ,sabiendo ya el tipo 
            switch(dataLogin.tipo)
            {
              case "paciente": { 

              this.pacienteService.Obtenerpaciente(dataLogin.id).subscribe(item=>{
                this.paciente=item.map(x=>x);                
                localStorage.setItem('LoginUsuario', JSON.stringify(this.paciente));
              });
              localStorage.setItem('Login', JSON.stringify(dataLogin));
             
                //statements; 
                break; 
            } 
            case "profesional": {
              
              this.profesioanService.Obtenerprofesional(dataLogin.id).subscribe(item=>{
                this.profesional=item.map(x=>x);                
                localStorage.setItem('LoginUsuario', JSON.stringify(this.profesional));
              });
              localStorage.setItem('Login', JSON.stringify(dataLogin));
           
                //statements; 
                break; 
            } 
            default: {

              localStorage.setItem('Login', JSON.stringify(dataLogin));
                //statements; 
                break; 
            } 
            }
        }

    })
    this.router.navigate(['/bienvenida']);

  }
  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      recaptcha: ['']
    });
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }
}
 