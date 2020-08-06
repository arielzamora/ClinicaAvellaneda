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

  public Obtenerpaciente(id:string):Observable<paciente[]>{
    this.pacienteColeccion=this.afs.collection<paciente>('pacientes',x=>x.where("id","==",id));
    return this.pacientes=this.pacienteColeccion.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as paciente;
        data.idPaciente = action.payload.doc.id;
        return data;
      });
    }));
  }

  public RegistrarPaciente(paciente:paciente){
  //creo el usuario
  const id = this.afs.createId();
    this.afs.collection('usuarios').doc(id).set({
      id:id ,
      contraseña:paciente.password,
      mail:paciente.usuario,
      nombre:paciente.nombre,
      tipo:"Paciente"
    }).then().catch();

    this.afs.collection('pacientes').doc(id).set({
      id:id , 
      nombre:paciente.nombre,
      apellido:paciente.apellido,
      dni:paciente.dni,
      sexo:paciente.sexo,
      edad:paciente.edad,
      nacionalidad:paciente.nacionalidad,
      planMedico:paciente.planMedico,
      urlImagen:paciente.urlImage
    }).then().catch();
  }


  
  public Registrar(paciente:paciente) {

    //creo login 
   this.dataLogin=new usuario();
   this.dataLogin.password = paciente.password;
   this.dataLogin.tipo = "paciente";
   this.dataLogin.nombre = paciente.nombre;
   this.dataLogin.usuario = paciente.usuario;
   return this.AFauth.createUserWithEmailAndPassword(this.dataLogin.usuario,this.dataLogin.password).then(userData =>{ 
     this.dataLogin.id=userData.user.uid;     
    }).catch(err => {
    });
  
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
