import { login } from './login';

export class profesional extends login{
   
    idProfesional: string; 
    nombre: string;
    apellido: string;
    dni:string;
    edad: string;
    especialidad: string;
    nacionalidad:string;

    constructor() {
        super();
              
    }
}
