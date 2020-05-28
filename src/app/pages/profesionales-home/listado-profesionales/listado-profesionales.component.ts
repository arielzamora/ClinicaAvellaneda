import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { profesional } from 'src/app/model/profesional';
import { ProfesionalService } from 'src/app/services/profesional.service';

@Component({
  selector: 'app-listado-profesionales',
  templateUrl: './listado-profesionales.component.html',
  styleUrls: ['./listado-profesionales.component.scss']
})
export class ListadoProfesionalesComponent implements OnInit {
  listaProfesionales: profesional[];
  showModalAlta: boolean;
  @Output() showModalOuput: EventEmitter<boolean>;
  constructor(private profesionalService:ProfesionalService) { 
    this.showModalOuput = new EventEmitter<boolean>();
    this.cargarLista();
  }

  ngOnInit(): void {
  }
  public cargarLista() {
    this.profesionalService.Listar()
     .subscribe(
      data => {
        this.listaProfesionales = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  showProfesionalAlta() {
    this.showModalAlta = true;
    this.showModalOuput.emit(this.showModalAlta);
  }
  showProfesionalModi(profe:profesional) {
    this.showModalAlta = true;
    this.showModalOuput.emit(this.showModalAlta);
  }
}
