import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, catchError, timeInterval } from 'rxjs/operators';
import { profesional } from "src/app/model/profesional"

import {AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument}from '@angular/fire/firestore';
import { firestore } from 'firebase';
import{AuthService} from 'src/app/services/auth.service';
import { usuario } from '../model/usuario';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usuarioColeccion:AngularFirestoreCollection<usuario>;
  private usuarioDoc:AngularFirestoreDocument<usuario>;
  private usuarios:Observable<usuario[]>;
  private usuario:Observable<usuario>;
  dataLogin:any;
  constructor(private AFauth :AngularFireAuth,private afs:AngularFirestore) { }

  public Listar(): Observable<usuario[]> {
    this.usuarioColeccion=this.afs.collection<usuario>('usuarios');
    return this.usuarios=this.usuarioColeccion.snapshotChanges()
     .pipe(map(changes => {
       return changes.map(action => {
         const data = action.payload.doc.data() as usuario;
         data.id = action.payload.doc.id; 
         return data;
       });
     }));
  }
}
