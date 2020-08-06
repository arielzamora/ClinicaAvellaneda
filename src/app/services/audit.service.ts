import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { logProf } from '../model/log-prof';
import { turnosXEspe } from '../model/turnos-xespe';
import { turnosXDia } from '../model/turnos-xdia';
import { turnosXProf } from '../model/turnos-xprof';
import { diasXProf } from '../model/dias-xprof';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  constructor(
    private db: AngularFirestore
  ) { }

  /***************************LOGUEO DE PROFESIONALES*********************/
  public getLogProf() {
    return this.db.collection<logProf>('logProf').snapshotChanges()
  }
  //Alta
  public createLogProf(data: {usuario: string, fecha: string, hora: string}) {
    return this.db.collection('logProf').add(data);
  }
/***************************TURNOS X ESPECIALIDADES*********************/
public getTurnosXEspe() {
  return this.db.collection<turnosXEspe>('turnosXEspe').snapshotChanges()
}
//Alta
public createTurnosXEspe(data: {especialidad: string, cantTurnos: number}) {
  return this.db.collection('turnosXEspe').add(data);
}
//Actualiza
public addTurnosXEspe(id, data: {especialidad: string, cantTurnos: number}) {
  return this.db.collection('turnosXEspe').doc(id).set(data);
}
/***************************TURNOS X DIAS*********************/
public getTurnosXDia() {
  return this.db.collection<turnosXDia>('turnosXDia').snapshotChanges()
}
//Alta
public createTurnosXDia(data: {dia: string, cantTurnos: number}) {
  return this.db.collection('turnosXDia').add(data);
}
//Actualiza
public addTurnosXDia(id, data: {dia: string, cantTurnos: number}) {
  return this.db.collection('turnosXDia').doc(id).set(data);
}

/***************************TURNOS X Profe*********************/
public getTurnosXProfe() {
  return this.db.collection<turnosXProf>('turnosXProfe').snapshotChanges()
}
//Alta
public createTurnosXProfe(data: {profesional: string, cantTurnos: number}) {
  return this.db.collection('turnosXProfe').add(data);
}
//Actualiza
public addTurnosXProfe(id, data: {profesional: string, cantTurnos: number}) {
  return this.db.collection('turnosXProfe').doc(id).set(data);
}

/***************************dias X Profe*********************/
public getDiasXProfe() {
  return this.db.collection<diasXProf>('diasXProfe').snapshotChanges()
}
//Alta
public createDiasXProfe(data: {dia: string, cantProfe: number, profesionales: Array<any>}) {
  return this.db.collection('diasXProfe').add(data);
}
//Actualiza
public addDiasXProfe(id, data: {dia: string, cantProfe: number, profesionales: Array<any>}) {
  return this.db.collection('diasXProfe').doc(id).set(data);
}

}
