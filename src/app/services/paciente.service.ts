import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, catchError, timeInterval } from 'rxjs/operators';
import { paciente } from "src/app/model/paciente";
import {AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument}from '@angular/fire/firestore';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private pacienteColeccion:AngularFirestoreCollection<paciente>;
  private pacienteDoc:AngularFirestoreDocument<paciente>;
  private pacientes:Observable<paciente[]>;
  private paciente:Observable<paciente>;

  constructor(private afs:AngularFirestore) { 

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

    this.pacienteColeccion=this.afs.collection<paciente>('pacientes');
    return new Promise((resolve, reject) => {

    this.pacienteColeccion.add(paciente).then(result => {
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
