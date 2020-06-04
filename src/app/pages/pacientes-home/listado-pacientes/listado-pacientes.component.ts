import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'src/app/services/paciente.service';
import { paciente } from 'src/app/model/paciente';

@Component({
  selector: 'app-listado-pacientes',
  templateUrl: './listado-pacientes.component.html',
  styleUrls: ['./listado-pacientes.component.scss']
})
export class ListadoPacientesComponent implements OnInit {
 
  listaPacientes:paciente[];
  constructor(private pacienteService:PacienteService) { 
    this.cargarLista();
  }

  ngOnInit(): void {
  }

  public cargarLista() {
    this.pacienteService.Listar()
     .subscribe(
      data => {
        this.listaPacientes = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
