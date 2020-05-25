import { Injectable } from '@angular/core';
 import {AngularFireAuth} from '@angular/fire/auth';

import { Router } from "@angular/router";
import { login } from "../model/login";

import { map }from 'rxjs/operators';
import {auth}from 'firebase/app';
import {AngularFirestore} from '@angular/fire/firestore';
import { useAnimation } from '@angular/animations';
 




@Injectable({
  providedIn: 'root'
})


export class AuthService {

    // store the URL so we can redirect after logging in
    redirectUrl: string;

  public usuarios: Array<any>;
  existe:boolean=false;

  constructor(private AFauth :AngularFireAuth ,private afs:AngularFirestore,private router :Router) {

    if(!this.usuarios)
    {
      this.traerTodos()
    }
   }

  
  traerTodos()
  {
    this.usuarios = new Array<any>();

    let users = this.afs.collection("usuarios").valueChanges();

    users.forEach(user=>
      {
        user.forEach(item=>
          {
            this.usuarios.push(item);
          })
      });

      return this.usuarios;
  }

  public guardarUsuario(dataLogin: login)
  {
       
      this.usuarios.forEach(user=>{
        if((user.email==dataLogin.usuario)&&(user.contraseña==dataLogin.password)&&(!this.existe))
        {
          dataLogin.tipo=user.tipo;
          dataLogin.nombre=user.nombre;
          //no esta sigo
        }

    })
    //obtengo la lista de usuarios y si se encuenta logeo por email y password ,sabiendo ya el tipo 
    switch(dataLogin.tipo)
    {
      case "paciente": { 
        localStorage.setItem('Login', JSON.stringify(dataLogin));
        //statements; 
        break; 
     } 
     case "profesional": { 
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
    //si es admin no busco nada ,solo tiene accesso total
    
    //si es paciente busco toda su info 
    
    //si es especialista tambien busco toda su info

  }
    
  Loguear(dataLogin: login){

      return new Promise((resolve,reject)=>{
      this.AFauth.signInWithEmailAndPassword(dataLogin.usuario,dataLogin.password).then(userData =>{//despues doy de alta el empleado 
        resolve(userData)
        dataLogin.idUsario=userData.user.uid;
       // this.updateUserDataEmpleado(userData.user,role) //tenemos que enviarle el rol que se selecciona 
       this.guardarUsuario(dataLogin);
       }).catch(err=>{
         reject(err)
       });
   })
 }

  

  logout()
  {
    this.AFauth.signOut().then(()=> {
      this.router.navigate(['/login']);
    })
  }

  register(dataLogin: login)
  {
    return new Promise((resolve,rejected)=>{
      this.AFauth.createUserWithEmailAndPassword(dataLogin.usuario,dataLogin.password).then(user => {
        resolve(user);
      }).catch(err => rejected(err))
    });
  

  }

  //desde aca mi codigo 4
  registerUser(email: string, pass: string){
    return new Promise((resolve,reject) => { //doy de alta mail y pasword 
      this.AFauth.createUserWithEmailAndPassword(email,pass)
      .then(userData =>{//despues doy de alta el empleado 
         resolve(userData)
        // this.updateUserDataEmpleado(userData.user,role) //tenemos que enviarle el rol que se selecciona 
        }).catch(err=>{
          reject(err)
        });
    })
  }

  loginEmailUser(email: string, pass: string){
    return new Promise((resolve,reject) => {
      this.AFauth.signInWithEmailAndPassword(email,pass)
      .then( userData => resolve(userData),
      err => reject (err));
    })
  }

  //si se registra por facebook ,le asignamos el rol de cliente 
  loginFacebookUser(){
   return this.AFauth.signInWithPopup(new auth.FacebookAuthProvider())
   .then((credential)=>{
    // this.updateUserDataCliente(credential.user);
   });
  }


  //si se registra por google ,le asignamos el rol de cliente
  loginGoogleUser(){
  return  this.AFauth.signInWithPopup(new auth.GoogleAuthProvider())
  .then((credential)=>{
    //this.updateUserDataCliente(credential.user);
  });
  }

  logoutUser(){
   return this.AFauth.signOut();
  }

  isAuth()
  {
    return this.AFauth.authState.pipe(map(auth=>auth));
  }

 isUserComanda(userUid){
    // const userRef:AngularFirestoreDocument<Empleado>= this.afs.doc('Empleado/'+userUid);
    // return userRef.valueChanges();
 
  }


}
