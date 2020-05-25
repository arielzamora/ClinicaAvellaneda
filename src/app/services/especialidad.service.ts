
import{especialidad}from "src/app/model/especialidad";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, catchError, timeInterval } from 'rxjs/operators';
import {AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument}from '@angular/fire/firestore';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {
  private especialidadColeccion:AngularFirestoreCollection<especialidad>;
  private especialidadDoc:AngularFirestoreDocument<especialidad>;
  private especialidads:Observable<especialidad[]>;
  private especialidad:Observable<especialidad>;

  constructor(private afs:AngularFirestore) { 

    this.especialidadColeccion=afs.collection<especialidad>('especialidads');
    this.especialidads=this.especialidadColeccion.valueChanges(); 

  }

  public Listar(): Observable<especialidad[]> {
    this.especialidadColeccion=this.afs.collection<especialidad>('especialidads');
    return this.especialidads=this.especialidadColeccion.snapshotChanges()
     .pipe(map(changes => {
       return changes.map(action => {
         const data = action.payload.doc.data() as especialidad;
         data.idEspecialidad = action.payload.doc.id; 
         return data;
       });
     }));
  }

  public Obtenerespecialidad(codigo:string):Observable<especialidad[]>{
    this.especialidadColeccion=this.afs.collection<especialidad>('especialidads',x=>x.where("codigo","==",codigo));
    return this.especialidads=this.especialidadColeccion.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as especialidad;
        data.idEspecialidad = action.payload.doc.id;
        return data;
      });
    }));
  }


  public Registrar(especialidad:especialidad): Promise<any> {

    this.especialidadColeccion=this.afs.collection<especialidad>('especialidads');
    return new Promise((resolve, reject) => {

    this.especialidadColeccion.add(especialidad).then(result => {
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