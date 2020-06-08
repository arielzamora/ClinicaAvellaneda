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
  showModalEdit:boolean;
  showModalDetalle:boolean;
  @Output() showModalOuput: EventEmitter<boolean>;
  @Output() showModalOuputEdit: EventEmitter<profesional>;
  @Output() showModalOuputDetalle: EventEmitter<profesional>;
  profesional:profesional
  constructor(private profesionalService:ProfesionalService) { 
    this.showModalOuput = new EventEmitter<boolean>();
    this.showModalOuputEdit= new EventEmitter<profesional>();
    this.showModalOuputDetalle= new EventEmitter<profesional>();
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
  showProfesionalEdit(profe:profesional) {
    this.profesional=profe;
    this.showModalEdit = true;
    this.showModalOuputEdit.emit(this.profesional);
  }
  showDetalle(profe:profesional) {
    this.profesional=profe;
    this.showModalDetalle = true;
    this.showModalOuputDetalle.emit(this.profesional);
  }
}
