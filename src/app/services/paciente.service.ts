import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, catchError, timeInterval } from 'rxjs/operators';
import { paciente } from "src/app/model/paciente";
import {AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument}from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { usuario } from '../model/usuario';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private pacienteColeccion:AngularFirestoreCollection<paciente>;
  private pacienteDoc:AngularFirestoreDocument<paciente>;
  private pacientes:Observable<paciente[]>;
  private paciente:Observable<paciente>;
  dataLogin:any;
  constructor(private AFauth :AngularFireAuth,private afs:AngularFirestore) { 

    this.pacienteColeccion=afs.collection<paciente>('pacientes');
    this.pacientes=this.pacienteColeccion.valueChanges(); 

  }

  public Listar(): Observable<paciente[]> {
    this.pacienteColeccion=this.afs.collection<paciente>('pacientes');
    return this.pacientes=this.pacienteColeccion.snapshotChanges()
     .pipe(map(changes => {
       return changes.map(action => {
         const data = action.payload.doc.data() as paciente;
         data.idPaciente = action.payload.doc.id; 
         return data;
       });
     }));
  }

  public Obtenerpaciente(codigo:string):Observable<paciente[]>{
    this.pacienteColeccion=this.afs.collection<paciente>('pacientes',x=>x.where("codigo","==",codigo));
    return this.pacientes=this.pacienteColeccion.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as paciente;
        data.idPaciente = action.payload.doc.id;
        return data;
      });
    }));
  }


  public Registrar(paciente:paciente): Promise<any> {

    //creo login 
   this.dataLogin=new usuario();
   this.dataLogin.password = paciente.password;
   this.dataLogin.tipo = "paciente";
   this.dataLogin.nombre = paciente.nombre;
   this.dataLogin.usuario = paciente.usuario;
   return new Promise((resolve, reject) => {
     this.AFauth.createUserWithEmailAndPassword(this.dataLogin.usuario,this.dataLogin.password).then(userData =>{ 
     this.dataLogin.id=userData.user.uid;   
      //creo el usuario
      this.afs.collection('usuarios').doc(this.dataLogin.id).set({
        id:this.dataLogin.id,
        contraseña:this.dataLogin.password,
        mail:this.dataLogin.usuario,
        nombre:this.dataLogin.nombre,
        tipo:this.dataLogin.tipo
      }).then().catch();

      this.afs.collection('pacientes').doc(this.dataLogin.id).set({
        id: this.dataLogin.id, 
        nombre: paciente.nombre,
        apellido: paciente.apellido,
        dni:paciente.dni,
        sexo:paciente.sexo,
        edad: paciente.edad,
        nacionalidad:paciente.nacionalidad,
        planMedico:paciente.planMedico,
        urlImagen:paciente.urlImage
      }).then().catch();

      resolve(true);
    }).catch(err => {
      reject(false);
    });
  
})
 }

  public Eliminar(paciente: paciente): Promise<Object> {
       return new Promise((resolve, reject) => {
       this.pacienteDoc=this.afs.doc<paciente>('pacientes/'+paciente.idPaciente); 
       this.pacienteDoc.delete().then(result => {
         resolve(true);
         }).catch(err => {
           reject(false);
         });
       
     })
  }
}
