import { usuario } from './usuario';

export class profesional extends usuario{
   
    id: string; 
    idProfesional: string; 
    nombre: string;
    apellido: string;
    dni:string;
    sexo:string;
    edad: string;
    especialidad: string;
    nacionalidad:string;
    horario:string;

    constructor() {
        super();
              
    }
}
