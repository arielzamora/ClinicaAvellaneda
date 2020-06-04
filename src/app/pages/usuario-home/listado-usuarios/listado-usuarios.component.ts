import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.scss']
})
export class ListadoUsuariosComponent implements OnInit {

  listaUsuarios:usuario[];
  constructor(private usuariosService:UsuariosService) {
    this.cargarLista();
   }

  ngOnInit(): void {
  }
  public cargarLista() {
    this.usuariosService.Listar()
     .subscribe(
      data => {
        this.listaUsuarios = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
