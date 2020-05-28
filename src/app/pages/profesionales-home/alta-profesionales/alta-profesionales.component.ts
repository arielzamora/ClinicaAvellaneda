import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { profesional } from 'src/app/model/profesional';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ProfesionalService} from 'src/app/services/profesional.service';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { especialidad } from 'src/app/model/especialidad';

@Component({
  selector: 'app-alta-profesionales',
  templateUrl: './alta-profesionales.component.html',
  styleUrls: ['./alta-profesionales.component.scss']
})
export class AltaProfesionalesComponent implements OnInit {

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
  focus:any;
  listaEspecialidad: especialidad[];
  constructor(private fb: FormBuilder,private especialidaService:EspecialidadService, private profesionalService:ProfesionalService) {

    this.closeModal = new EventEmitter<void>();
    this.registradoCorrectamente = new EventEmitter<any>();
    this.cargarLista();
  }

  ngOnInit() {

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
      horario: ['', Validators.required]
    });
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
  Submit() {
    this.errorMessage = '';
    this.error = false;
    this.success = false;
    this.submitted=true;

    if (this.form.valid ) {
      this.profesional=new profesional();
      this.profesional.idProfesional = this.form.get('idProfesional').value;
      this.profesional.nombre = this.form.get('nombre').value;
      this.profesional.apellido = this.form.get('apellido').value;
      this.profesional.usuario = this.form.get('email').value;
      this.profesional.password = this.form.get('password').value;
      this.profesional.tipo = this.form.get('tipoDni').value;
      this.profesional.dni = this.form.get('dni').value;
      this.profesional.sexo = this.form.get('sexo').value;
      this.profesional.edad = this.form.get('edad').value;
      this.profesional.horario = this.form.get('horario').value;
      this.profesional.especialidad = this.form.get('especialidad').value;
      this.profesional.nacionalidad = this.form.get('nacionalidad').value;

      this.profesionalService.Registrar(this.profesional)
        .then(
          response => {
            console.log(response);
            if (response) {
              this.success = true;
              this.form.reset();

              this.registradoCorrectamente.emit();
              this.cerrar();
            } else {
              this.error = true;
              this.errorMessage = "error al registrar el profesional";
            }
          }
        )
        .catch(
          error => {
            this.error = true;
            this.errorMessage = "error al registrar el profesional";
            console.log(error);
          }
        );
    } else {
      this.errorMessage = 'Debe completar los campos correctamente.';
      this.error = true;
      this.success = false;
      this.submitted=false;
  
    }
  }

  cargarForm(){
    this.form = this.fb.group({
      idProfesional: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      tipoDni: ['', Validators.required],
      sexo: ['', Validators.required],
      edad: ['', Validators.required],
      especialidad: ['', Validators.required],
      nacionalidad: ['', Validators.required]

    });
  }

  cerrar() {
    this.closeModal.emit();
    this.form.reset();
  }

}
