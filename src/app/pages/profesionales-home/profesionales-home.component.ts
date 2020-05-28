import { Component, OnInit } from '@angular/core';
import { profesional } from 'src/app/model/profesional';
import { usuario } from 'src/app/model/usuario';
import { ProfesionalService } from 'src/app/services/profesional.service';

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

  constructor() {
    
    this.obtenerUsuarioActual();
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