import { usuario } from './usuario';
import { especialidad } from './especialidad';
import { turno } from './turno';

export class paciente extends usuario{
   
        idPaciente: string; 
        nombre: string;
        apellido: string;
        dni:string;
        edad: string;
        listaTurnos:turno[];
        sexo:string;
        telefono:string;
        nacionalidad:string;
        planMedico:string;
        activo:boolean;
        urlImage:string;

    constructor() {
        super();
        
    }
}