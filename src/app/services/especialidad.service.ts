
import{especialidad}from "src/app/model/especialidad";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, catchError, timeInterval } from 'rxjs/operators';
import {AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument}from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { especialidadProfesional } from '../model/especialidadProfesional';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {
  private especialidadColeccion:AngularFirestoreCollection<especialidad>;
  private espProfesionalColeccion:AngularFirestoreCollection<especialidadProfesional>;
  private especialidadDoc:AngularFirestoreDocument<especialidad>;
  private especialidads:Observable<especialidad[]>;
  private espProfesional:Observable<especialidadProfesional[]>;
  private especialidad:Observable<especialidad>;

  constructor(private afs:AngularFirestore) { 


  }

  public Listar(): Observable<especialidad[]> {
    this.especialidadColeccion=this.afs.collection<especialidad>('especialidades');
    return this.especialidads=this.especialidadColeccion.snapshotChanges()
     .pipe(map(changes => {
       return changes.map(action => {
         const data = action.payload.doc.data() as especialidad;
         data.id = action.payload.doc.id; 
         return data;
       });
     }));
  }

  public ListarEspecialidadProfesional(idProfesional:string): Observable<especialidadProfesional[]> {
    this.espProfesionalColeccion=this.afs.collection<especialidadProfesional>('profesionalEspecialidad',x=>x.where("idProfesional","==",idProfesional));
    return this.espProfesional=this.espProfesionalColeccion.snapshotChanges()
     .pipe(map(changes => {
       return changes.map(action => {
         const data = action.payload.doc.data() as especialidadProfesional;
         return data;
       });
     }));
  }

  public Obtenerespecialidad(codigo:string):Observable<especialidad[]>{
    this.especialidadColeccion=this.afs.collection<especialidad>('especialidades',x=>x.where("codigo","==",codigo));
    return this.especialidads=this.especialidadColeccion.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as especialidad;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }


  public Registrar(especialidad:especialidad): Promise<any> {

    
    return new Promise((resolve, reject) => {

      this.afs.collection('especialidades').add({
        idEspecialidad: especialidad.idEspecialidad,
        fechaAlta:especialidad.fechaAlta,
        nombre: especialidad.nombre,
        usuarioAlta:especialidad.usuarioAlta,
        activa:especialidad.activa,
        usuarioAprobacion:especialidad.usuarioAprobacion      
    }).then(result => {
      resolve(true);
      }).catch(err => {
        reject(false);
      });
    
    })
  }

  public Eliminar(especialidad: especialidad): Promise<Object> {
       return new Promise((resolve, reject) => {
       this.especialidadDoc=this.afs.doc<especialidad>('especialidads/'+especialidad.idEspecialidad); 
       this.especialidadDoc.delete().then(result => {
         resolve(true);
         }).catch(err => {
           reject(false);
         });
       
     })
  }
}