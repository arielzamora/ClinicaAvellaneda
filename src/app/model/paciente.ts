import { login } from './login';
import { especialidad } from './especialidad';
import { turno } from './turno';

export class paciente extends login{
   
    idPaciente: string; 
    nombre: string;
    apellido: string;
    dni:string;
    edad: string;
    listaTurnos:turno[];
    sexo:string;
    nacionalidad:string;

    constructor() {
        super();
        
    }
}