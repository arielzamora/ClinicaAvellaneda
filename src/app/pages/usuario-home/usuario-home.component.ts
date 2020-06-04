import { Component, OnInit } from '@angular/core';
import { usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-usuario-home',
  templateUrl: './usuario-home.component.html',
  styleUrls: ['./usuario-home.component.scss']
})
export class UsuarioHomeComponent implements OnInit {
  
  user:usuario;
  isLogueado:boolean;
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
