import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { especialidad } from 'src/app/model/especialidad';
import { AltaEspecialidadesComponent } from '../alta-especialidades/alta-especialidades.component';

@Component({
  selector: 'app-listado-especialidades',
  templateUrl: './listado-especialidades.component.html',
  styleUrls: ['./listado-especialidades.component.scss']
})
export class ListadoEspecialidadesComponent implements OnInit {

  @Input() listaEspecialidad: especialidad[];
 
  showModalAlta: boolean;
  @Output() showModalOuput: EventEmitter<boolean>;
  constructor() {
    this.showModalOuput = new EventEmitter<boolean>();
   }

  ngOnInit(): void {
  }

  showEspecialidadAlta() {
    this.showModalAlta = true;
    this.showModalOuput.emit(this.showModalAlta);
  }
  showEspecialidadModi(especialidad:especialidad) {
    this.showModalAlta = true;
    this.showModalOuput.emit(this.showModalAlta);
  }
}
