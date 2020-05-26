import { Component, OnInit } from '@angular/core';
import{EspecialidadService}from 'src/app/services/especialidad.service';
import{especialidad}from 'src/app/model/especialidad';
import { login } from 'src/app/model/login';

@Component({
  selector: 'app-especialidades-home',
  templateUrl: './especialidades-home.component.html',
  styleUrls: ['./especialidades-home.component.scss']
})
export class EspecialidadesHomeComponent implements OnInit {

  public listaEspecialidad: especialidad[];
  user:login;
  isLogueado:boolean;
  showModalHome:boolean;

  constructor(private especialidadService:EspecialidadService) {
    this.cargarLista();
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
