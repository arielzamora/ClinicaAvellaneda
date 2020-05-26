import { Component, OnInit } from '@angular/core';
import { paciente } from 'src/app/model/paciente';
import { PacienteService } from 'src/app/services/paciente.service';
import { login } from 'src/app/model/login';

@Component({
  selector: 'app-pacientes-home',
  templateUrl: './pacientes-home.component.html',
  styleUrls: ['./pacientes-home.component.scss']
})
export class PacientesHomeComponent implements OnInit {

  public listaEspecialidad: paciente[];
  user:login;
  isLogueado:boolean;

  constructor(private especialidadService:PacienteService) {
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