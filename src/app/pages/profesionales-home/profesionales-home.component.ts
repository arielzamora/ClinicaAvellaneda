import { Component, OnInit } from '@angular/core';
import { profesional } from 'src/app/model/profesional';
import { login } from 'src/app/model/login';
import { ProfesionalService } from 'src/app/services/profesional.service';

@Component({
  selector: 'app-profesionales-home',
  templateUrl: './profesionales-home.component.html',
  styleUrls: ['./profesionales-home.component.scss']
})
export class ProfesionalesHomeComponent implements OnInit {
  public listaEspecialidad: profesional[];
  user:login;
  isLogueado:boolean;

  constructor(private especialidadService:ProfesionalService) {
    //this.cargarLista();
    this.obtenerUsuarioActual();
   }

   obtenerUsuarioActual()
   {
     const data = localStorage.getItem('Login');
     this.user=JSON.parse(data);
     this.isLogueado=true;
   }
  public cargarLista() {
    this.especialidadService.Listar()
     .subscribe(
      data => {
        this.listaEspecialidad = data;
      },
      error => {
        console.log(error);
      }
    );
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