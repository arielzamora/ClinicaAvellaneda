import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { profesional } from 'src/app/model/profesional';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { diasHorarios } from 'src/app/model/diashorarios';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { ProfesionalService } from 'src/app/services/profesional.service';
import { especialidad } from 'src/app/model/especialidad';

@Component({
  selector: 'app-registro-turno',
  templateUrl: './registro-turno.component.html',
  styleUrls: ['./registro-turno.component.scss']
})
export class RegistroTurnoComponent implements OnInit {

  profesional:profesional;
  @Input() showModalAlta: boolean;
  @Output() closeModal: EventEmitter<void>;
  submitted = false;
  get f() { return this.form.controls; }
  @Output() registradoCorrectamente: EventEmitter<any>;
  public form: FormGroup;
  public key: string;
  public errorMessage: string;
  public error: boolean;
  public success: boolean;
  public diasHorarios:diasHorarios;
  listaEspecialidad: especialidad[];
  constructor(private fb: FormBuilder,private especialidaService:EspecialidadService, private profesionalService:ProfesionalService) {
    this.cargarLista();     
    this.diasHorarios=new diasHorarios();
   }

   public cargarLista() {
    this.especialidaService.Listar()
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
    this.form = this.fb.group({
      idProfesional: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      tipoDni: ['', Validators.required],
      sexo: ['', Validators.required],
      dni: ['', Validators.required],
      edad: ['', Validators.required],
      especialidad: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      horario: ['', Validators.required],
      lunes:[''],
      martes:[''],
      miercoles:[''],
      jueves:[''],
      viernes:[''],
      sabado:[''],
    });

  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }

}
