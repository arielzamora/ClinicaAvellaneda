import { Component, OnInit } from '@angular/core';
import { Input,Output, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { especialidad } from 'src/app/model/especialidad';
import { EspecialidadService } from 'src/app/services/especialidad.service';

@Component({
  selector: 'app-alta-especialidades',
  templateUrl: './alta-especialidades.component.html',
  styleUrls: ['./alta-especialidades.component.scss']
})
export class AltaEspecialidadesComponent implements OnInit {


  especialidad:especialidad;
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

  constructor(private fb: FormBuilder, private especialidadService:EspecialidadService) {

    this.closeModal = new EventEmitter<void>();
    this.registradoCorrectamente = new EventEmitter<any>();
  
  }

  ngOnInit() {
    this.form = this.fb.group({
      idEspecialidad: ['', Validators.required],
      nombre: ['', Validators.required],
    });
  }


  Submit() {
    this.errorMessage = '';
    this.error = false;
    this.success = false;
    this.submitted=true;

    if (this.form.valid ) {

      this.especialidad.idEspecialidad = this.form.get('idEspecialidad').value;
      this.especialidad.nombre = this.form.get('nombre').value;

      this.especialidadService.Registrar(this.especialidad)
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
              this.errorMessage = "error al registrar mesa";
            }
          }
        )
        .catch(
          error => {
            this.error = true;
            this.errorMessage = "error al registrar mesa";
            console.log(error);
          }
        );
    } else {
      this.errorMessage = 'Debe completar los campos correctamente.';
      this.error = true;
    }
  }

  cargarModal() {
    //this.cargarForm();
    //this.form.reset();
  }

  cargarForm(){
    this.form = this.fb.group({
      idEspecialidad: ['', Validators.required],
      nombre: ['', Validators.required]

    });
  }

  cerrar() {
    this.closeModal.emit();
    this.form.reset();
  }
}
