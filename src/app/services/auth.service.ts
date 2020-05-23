// import { Injectable } from '@angular/core';
//  import {AngularFireAuth} from '@angular/fire/auth';

// import { Router } from "@angular/router";
// //import { Login } from '../clases/Paciente';

// import { map }from 'rxjs/operators';
// import {auth}from 'firebase/app';
// import {AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from '@angular/fire/firestore';
 




// @Injectable({
//   providedIn: 'root'
// })


// export class AuthService {

//     // store the URL so we can redirect after logging in
//     redirectUrl: string;

//     //private empleadoDoc:AngularFirestoreDocument<Empleado>;
//     //private empleado:Empleado;


//   constructor(private AFauth :AngularFireAuth ,private afs:AngularFirestore,private router :Router) { }

//   Loguear(dataLogin: Login){

//       return new Promise((resolve,rejected)=>{
//       this.AFauth.auth.signInWithEmailAndPassword('','').then(user => { 
//         resolve(user);
//       }).catch(err => rejected(err))

//     });

//   }        

  

//   logout()
//   {
//     this.AFauth.auth.signOut().then(()=> {
//       this.router.navigate(['/Login']);
//     })
//   }

//   register(dataLogin: Login)
//   {
//     return new Promise((resolve,rejected)=>{
//       this.AFauth.auth.createUserWithEmailAndPassword(dataLogin.user,dataLogin.pass).then(user => {
//         resolve(user);
//       }).catch(err => rejected(err))
//     });
  

//   }

//   //desde aca mi codigo 4
//   registerUser(email: string, pass: string){
//     return new Promise((resolve,reject) => { //doy de alta mail y pasword 
//       this.AFauth.auth.createUserWithEmailAndPassword(email,pass)
//       .then(userData =>{//despues doy de alta el empleado 
//          resolve(userData)
//         // this.updateUserDataEmpleado(userData.user,role) //tenemos que enviarle el rol que se selecciona 
//         }).catch(err=>{
//           reject(err)
//         });
//     })
//   }

//   loginEmailUser(email: string, pass: string){
//     return new Promise((resolve,reject) => {
//       this.AFauth.auth.signInWithEmailAndPassword(email,pass)
//       .then( userData => resolve(userData),
//       err => reject (err));
//     })
//   }

//   //si se registra por facebook ,le asignamos el rol de cliente 
//   loginFacebookUser(){
//    return this.AFauth.auth.signInWithPopup(new auth.FacebookAuthProvider())
//    .then((credential)=>{
//     // this.updateUserDataCliente(credential.user);
//    });
//   }


//   //si se registra por google ,le asignamos el rol de cliente
//   loginGoogleUser(){
//   return  this.AFauth.auth.signInWithPopup(new auth.GoogleAuthProvider())
//   .then((credential)=>{
//     //this.updateUserDataCliente(credential.user);
//   });
//   }

//   logoutUser(){
//    return this.AFauth.auth.signOut();
//   }

//   isAuth()
//   {
//     return this.AFauth.authState.pipe(map(auth=>auth));
//   }

//  isUserComanda(userUid){
//    /*  const userRef:AngularFirestoreDocument<Empleado>= this.afs.doc('Empleado/'+userUid);
//     return userRef.valueChanges();
//  */
//   }


// }
