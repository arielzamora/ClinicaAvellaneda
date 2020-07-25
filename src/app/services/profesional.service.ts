import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, catchError, timeInterval } from 'rxjs/operators';
import { profesional } from "src/app/model/profesional"

import {AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument}from '@angular/fire/firestore';
import { firestore } from 'firebase';
import{AuthService} from 'src/app/services/auth.service';
import { usuario } from '../model/usuario';
import {AngularFireAuth} from '@angular/fire/auth';
import { especialidad } from '../model/especialidad';
import { newArray } from '@angular/compiler/src/util';
import { especialidadProfesional } from '../model/especialidadProfesional';

@Injectable({
  providedIn: 'root'
})
export class ProfesionalService {

  private profesionalColeccion:AngularFirestoreCollection<profesional>;
  private usuariosColeccion:AngularFirestoreCollection<usuario>;
  private profesionalDoc:AngularFirestoreDocument<profesional>;
  private profesionals:Observable<profesional[]>;
  private profesional:Observable<profesional>;
  private listadoEspecialidades:especialidad[]
  listado:{};
  dataLogin:any;
  constructor(private AFauth :AngularFireAuth,private afs:AngularFirestore) { 
      this.listadoEspecialidades=new Array<especialidad>();

  }

  public Listar(): Observable<profesional[]> {
    this.profesionalColeccion=this.afs.collection<profesional>('profesionales');
    return this.profesionals=this.profesionalColeccion.snapshotChanges()
     .pipe(map(changes => {
       return changes.map(action => {
         const data = action.payload.doc.data() as profesional;
         return data;
       });
     }));
  }



   


  public Obtenerprofesional(id:string):Observable<profesional[]>{
    this.profesionalColeccion=this.afs.collection<profesional>('profesionales',x=>x.where("id","==",id));
    return this.profesionals=this.profesionalColeccion.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as profesional;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }

  public RegistrarEspecialidadesProfesionales(especialidad:especialidadProfesional){
    
    //actualizo las especialidades
    const id = this.afs.createId();
    this.afs.collection('profesionalEspecialidad').doc(id).set({
      idEspecialida:especialidad.idEspecialida,
      idProfesional:especialidad.idProfesional,
      nombre:especialidad.nombre,
      activa:especialidad.activa,
      usuarioAlta:especialidad.usuarioAlta,
      usuarioAprobacion:especialidad.usuarioAprobacion      
    });
  }

  public RegistrarProfesional(profe:profesional){
 //creo el usuario

       const id = this.afs.createId();
        this.afs.collection('usuarios').doc(id).set({
          id:id,
          contraseña:profe.password,
          mail:profe.usuario,
          nombre:profe.nombre,
          tipo:"profesional"
        }).then().catch();

        this.afs.collection('profesionales').doc(id).set({
          id: id, 
          idProfesional: profe.idProfesional, 
          nombre: profe.nombre,
          apellido: profe.apellido,
          dni:profe.dni,
          sexo:profe.sexo,
          horario:profe.horario,
          edad: profe.edad,
          nacionalidad:profe.nacionalidad,   
          imagen:profe.urlImage,    
          habilitado: false,
          diasHorarios:{
            lunes:profe.diasHorarios.lunes,
            martes:profe.diasHorarios.martes,
            miercoles:profe.diasHorarios.miercoles,
            jueves:profe.diasHorarios.jueves,
            viernes:profe.diasHorarios.viernes,
            sabado:profe.diasHorarios.sabado      
          }
        }).then().catch();   
  }

  public Registrar(profe:profesional){

   //creo login 
   this.dataLogin=new usuario();
   this.dataLogin.password = profe.password;
   this.dataLogin.tipo = "profesional";
   this.dataLogin.nombre = profe.nombre;
   this.dataLogin.usuario = profe.usuario;
   return this.AFauth.createUserWithEmailAndPassword(this.dataLogin.usuario,this.dataLogin.password).then(userData =>{ 
     this.dataLogin.id=userData.user.uid;        
      });
 }

  public Eliminar(profesional: profesional): Promise<Object> {
       return new Promise((resolve, reject) => {
       this.profesionalDoc=this.afs.doc<profesional>('profesionales/'+profesional.id); 
       this.profesionalDoc.delete().then(result => {
         resolve(true);
         }).catch(err => {
           reject(false);
         });
       
     })
  }

}

