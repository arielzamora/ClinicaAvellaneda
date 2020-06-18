import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, catchError, timeInterval } from 'rxjs/operators';
import { turno } from "src/app/model/turno"

import {AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument}from '@angular/fire/firestore';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  private turnoColeccion:AngularFirestoreCollection<turno>;
  private turnoDoc:AngularFirestoreDocument<turno>;
  private turnos:Observable<turno[]>;
  private turno:Observable<turno>;

  constructor(private afs:AngularFirestore) { 

    this.turnoColeccion=afs.collection<turno>('turnos');
    this.turnos=this.turnoColeccion.valueChanges(); 

  }

  public ListarTurnosProfesional(idProfesional:string): Observable<turno[]> {
    this.turnoColeccion=this.afs.collection<turno>('turnos',x=>x.where("idProfesional","==",idProfesional));
    return this.turnos=this.turnoColeccion.snapshotChanges()
     .pipe(map(changes => {
       return changes.map(action => {
         const data = action.payload.doc.data() as turno;
         data.idTurno = action.payload.doc.id; 
         return data;
       });
     }));
  }

  public ListarTurnosPacientes(idPaciente:string): Observable<turno[]> {
    this.turnoColeccion=this.afs.collection<turno>('turnos',x=>x.where("idPaciente","==",idPaciente));
    return this.turnos=this.turnoColeccion.snapshotChanges()
     .pipe(map(changes => {
       return changes.map(action => {
         const data = action.payload.doc.data() as turno;
         data.idTurno = action.payload.doc.id; 
         return data;
       });
     }));
  }

  public Listar(): Observable<turno[]> {
    this.turnoColeccion=this.afs.collection<turno>('turnos');
    return this.turnos=this.turnoColeccion.snapshotChanges()
     .pipe(map(changes => {
       return changes.map(action => {
         const data = action.payload.doc.data() as turno;
         data.idTurno = action.payload.doc.id; 
         return data;
       });
     }));
  }

  public Obtenerturno(codigo:string):Observable<turno[]>{
    this.turnoColeccion=this.afs.collection<turno>('turnos',x=>x.where("codigo","==",codigo));
    return this.turnos=this.turnoColeccion.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as turno;
        data.idTurno = action.payload.doc.id;
        return data;
      });
    }));
  }

  public actualizar(turno:turno): Promise<any> 
  {
    this.turnoColeccion=this.afs.collection<turno>('turnos');
    return new Promise((resolve, reject) => {

    this.turnoColeccion.doc(turno.idTurno).set({
      fecha:turno.fecha,
      hora:turno.hora,
      especialidad:turno.especialidad,
      idEspecialidad:turno.idEspecialidad,
      paciente:turno.paciente,
      idPaciente:turno.idPaciente,
      profesional:turno.profesional,
      idProfesional:turno.idProfesional,
      estado:turno.estado,
      motivo:turno.motivo,
      reseña:turno.resenia,
      observaciones:turno.observaciones 
    }).then(result => {
      resolve(true);
      }).catch(err => {
        reject(false);
      });
    
    })
  }
  public cancelar(turno:turno): Promise<any> {
    this.turnoColeccion=this.afs.collection<turno>('turnos');
    return new Promise((resolve, reject) => {

    this.turnoColeccion.doc(turno.idTurno).set({
      fecha:turno.fecha,
      hora:turno.hora,
      especialidad:turno.especialidad,
      idEspecialidad:turno.idEspecialidad,
      paciente:turno.paciente,
      idPaciente:turno.idPaciente,
      profesional:turno.profesional,
      idProfesional:turno.idProfesional,
      estado:turno.estado,
      motivo:turno.motivo,
      reseña:turno.resenia,
      observaciones:turno.observaciones 
    }).then(result => {
      resolve(true);
      }).catch(err => {
        reject(false);
      });
    
    })
  }
  public Registrar(turno:turno): Promise<any> {

    this.turnoColeccion=this.afs.collection<turno>('turnos');
    return new Promise((resolve, reject) => {

     const id = this.afs.createId();

    this.turnoColeccion.doc(id).set({
      fecha:turno.fecha,
      hora:turno.hora,
      especialidad:turno.especialidad,
      idEspecialidad:turno.idEspecialidad,
      paciente:turno.paciente,
      idPaciente:turno.idPaciente,
      profesional:turno.profesional,
      idProfesional:turno.idProfesional,
      estado:turno.estado,
      motivo:turno.motivo,
      reseña:turno.resenia,
      observaciones:turno.observaciones 
    }).then(result => {
      resolve(true);
      }).catch(err => {
        reject(false);
      });
    
    })
  }

  public Eliminar(turno: turno): Promise<Object> {
       return new Promise((resolve, reject) => {
       this.turnoDoc=this.afs.doc<turno>('turnos/'+turno.idTurno); 
       this.turnoDoc.delete().then(result => {
         resolve(true);
         }).catch(err => {
           reject(false);
         });
       
     })
  }
}