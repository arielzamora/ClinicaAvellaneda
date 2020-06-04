import { usuario } from './usuario';
import { diasHorarios } from './diashorarios';
import { especialidad } from './especialidad';

export class profesional extends usuario{
   
    id: string; 
    idProfesional: string; 
    nombre: string;
    apellido: string;
    dni:string;
    sexo:string;
    edad: string;
    especialidades: especialidad[];
    nacionalidad:string;
    horario:string;
    diasHorarios:diasHorarios;

    constructor() {
        super();
              
    }
}
