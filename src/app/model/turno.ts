import { paciente } from './paciente';
import { profesional } from './profesional';
import { especialidad } from './especialidad';

export class turno {
    idTurno: string; 
    fecha: string;
    hora:string;
    especialidad:especialidad;
    paciente:paciente;
    profesional:profesional;
    tomado:boolean;
    cancelado:boolean;
    observaciones:string; 
    constructor() {
        
    }

}

