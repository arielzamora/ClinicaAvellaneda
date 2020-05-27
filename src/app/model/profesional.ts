import { login } from './login';

export class profesional extends login{
   
    id: string; 
    idProfesional: string; 
    nombre: string;
    apellido: string;
    dni:string;
    sexo:string;
    edad: string;
    especialidad: string;
    nacionalidad:string;

    constructor() {
        super();
              
    }
}
