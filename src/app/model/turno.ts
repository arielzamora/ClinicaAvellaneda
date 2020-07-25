import { paciente } from './paciente';
import { profesional } from './profesional';
import { especialidad } from './especialidad';

export class turno {
    completoEncuesta:boolean
    recibeInfo:boolean
    recomienda:boolean
    noRecomienda:boolean
    puntosLugar:string;
    idTurno: string; 
    fecha: string;
    hora:string;
    especialidad:string;
    idEspecialidad:string;
    idPaciente:string;
    paciente:string;
    idProfesional:string;
    profesional:string;
    motivo:string;
    estado:string;
    resenia:string;
    edad:string;
    presion:string;
    temperatura:string;
    observaciones:string; 
    puntosProfesional:number;
    clave1:string;
    clave2:string;
    clave3:string;
    clave4:string;
    clave5:string;
    valor1:string;
    valor2:string;
    valor3:string;
    valor4:string;
    valor5:string;
    constructor() {
        
    }

}

