import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { profesional } from 'src/app/model/profesional';

@Component({
  selector: 'app-listado-profesionales',
  templateUrl: './listado-profesionales.component.html',
  styleUrls: ['./listado-profesionales.component.scss']
})
export class ListadoProfesionalesComponent implements OnInit {

  @Input() listaEspecialidad: profesional[];
 
  showModalAlta: boolean;
  @Output() showModalOuput: EventEmitter<boolean>;
  constructor() { 
    this.showModalOuput = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
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
