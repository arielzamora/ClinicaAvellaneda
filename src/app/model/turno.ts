import { paciente } from './paciente';
import { profesional } from './profesional';
import { especialidad } from './especialidad';

export class turno {
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
    observaciones:string; 
    constructor() {
        
    }

}

