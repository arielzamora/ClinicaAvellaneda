import { usuario } from './usuario';
import { diasHorarios } from './diashorarios';
import { especialidad } from './especialidad';
import { especialidadProfesional } from './especialidadProfesional';

export class profesional extends usuario{
   
    id: string; 
    idProfesional: string; 
    nombre: string;
    apellido: string;
    dni:string;
    sexo:string;
    edad: string;
    nacionalidad:string;
    horario:string;
    diasHorarios:diasHorarios;

    constructor() {
        super();
              
    }
}
