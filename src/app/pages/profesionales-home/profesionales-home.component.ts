import { Component, OnInit } from '@angular/core';
import { profesional } from 'src/app/model/profesional';
import { usuario } from 'src/app/model/usuario';
import { ProfesionalService } from 'src/app/services/profesional.service';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { especialidadProfesional } from 'src/app/model/especialidadProfesional';

@Component({
  selector: 'app-profesionales-home',
  templateUrl: './profesionales-home.component.html',
  styleUrls: ['./profesionales-home.component.scss']
})
export class ProfesionalesHomeComponent implements OnInit {
  listadoProfesionales: profesional[];
  user:usuario;
  isLogueado:boolean;
  showModalHome:boolean;
  showModalEdit:boolean;
  showModalDetal:boolean;
  profesionalEdit:profesional;
  listaEspecialidad:especialidadProfesional[];

  constructor(private especialidaService:EspecialidadService) {
    
    this.obtenerUsuarioActual();
   }


    


   showModalHomeEdit(profe:profesional)
   {
     this.profesionalEdit=profe;
     this.showModalEdit=true;

   }

   public showModalDetalle(profe:profesional)
   {

    this.especialidaService.ListarEspecialidadProfesional(profe.idProfesional)
     .subscribe(
      data => {
        this.listaEspecialidad = data;
        this.profesionalEdit=profe;
        this.showModalDetal=true;
      },
      error => {
        console.log(error);
      }
    );
   }
   obtenerUsuarioActual()
   {
     const data = localStorage.getItem('Login');
     this.user=JSON.parse(data);
     this.isLogueado=true;
   }

  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");

  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }

}