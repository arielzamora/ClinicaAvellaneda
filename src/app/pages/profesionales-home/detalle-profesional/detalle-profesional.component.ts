import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { profesional } from 'src/app/model/profesional';
import { especialidad } from 'src/app/model/especialidad';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { especialidadProfesional } from 'src/app/model/especialidadProfesional';

@Component({
  selector: 'app-detalle-profesional',
  templateUrl: './detalle-profesional.component.html',
  styleUrls: ['./detalle-profesional.component.scss']
})
export class DetalleProfesionalComponent implements OnInit {

  profesional:profesional;
  @Input() showDetalle: boolean;
  @Input() profeInput: profesional;
  @Output() closeModal: EventEmitter<void>;
  submitted = false;
  @Output() registradoCorrectamente: EventEmitter<any>;
  @Input()listaInput: especialidadProfesional[];
  constructor() { 
    this.closeModal = new EventEmitter<void>();

  }

  ngOnInit(): void {


  }

  
  cerrar() {
    this.closeModal.emit();
  }
}
