import { Component, OnInit } from '@angular/core';
import { turno } from 'src/app/model/turno';
import { usuario } from 'src/app/model/usuario';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-turnos-home',
  templateUrl: './turnos-home.component.html',
  styleUrls: ['./turnos-home.component.scss']
})
export class TurnosHomeComponent implements OnInit {

  public listaEspecialidad: turno[];
  user:usuario;
  isLogueado:boolean;

  constructor(private especialidadService:TurnosService) {
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
