import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, catchError, timeInterval } from 'rxjs/operators';
import { profesional } from "src/app/model/profesional"

import {AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument}from '@angular/fire/firestore';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ProfesionalService {

  private profesionalColeccion:AngularFirestoreCollection<profesional>;
  private profesionalDoc:AngularFirestoreDocument<profesional>;
  private profesionals:Observable<profesional[]>;
  private profesional:Observable<profesional>;

  constructor(private afs:AngularFirestore) { 

    this.profesionalColeccion=afs.collection<profesional>('profesionals');
    this.profesionals=this.profesionalColeccion.valueChanges(); 

  }

  public Listar(): Observable<profesional[]> {
    this.profesionalColeccion=this.afs.collection<profesional>('profesionals');
    return this.profesionals=this.profesionalColeccion.snapshotChanges()
     .pipe(map(changes => {
       return changes.map(action => {
         const data = action.payload.doc.data() as profesional;
         data.idProfesional = action.payload.doc.id; 
         return data;
       });
     }));
  }

  public Obtenerprofesional(codigo:string):Observable<profesional[]>{
    this.profesionalColeccion=this.afs.collection<profesional>('profesionals',x=>x.where("codigo","==",codigo));
    return this.profesionals=this.profesionalColeccion.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as profesional;
        data.idProfesional = action.payload.doc.id;
        return data;
      });
    }));
  }


  public Registrar(profesional:profesional): Promise<any> {

    this.profesionalColeccion=this.afs.collection<profesional>('profesionals');
    return new Promise((resolve, reject) => {

    this.profesionalColeccion.add(profesional).then(result => {
      resolve(true);
      }).catch(err => {
        reject(false);
      });
    
    })
  }

  public Eliminar(profesional: profesional): Promise<Object> {
       return new Promise((resolve, reject) => {
       this.profesionalDoc=this.afs.doc<profesional>('profesionals/'+profesional.idProfesional); 
       this.profesionalDoc.delete().then(result => {
         resolve(true);
         }).catch(err => {
           reject(false);
         });
       
     })
  }

}

