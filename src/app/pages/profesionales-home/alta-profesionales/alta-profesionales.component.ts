import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { profesional } from 'src/app/model/profesional';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ProfesionalService} from 'src/app/services/profesional.service';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { especialidad } from 'src/app/model/especialidad';
import {diasHorarios}from 'src/app/model/diashorarios';

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
  public diasHorarios:diasHorarios;
  focus:any;
  listaEspecialidad: especialidad[];
  listaAuxAdd: especialidad[];
  listaAuxFinal: especialidad[];
  listaAux=new Array<especialidad>();
  constructor(private fb: FormBuilder,private especialidaService:EspecialidadService, private profesionalService:ProfesionalService) {

    this.closeModal = new EventEmitter<void>();
    this.registradoCorrectamente = new EventEmitter<any>();
    this.cargarLista();     
    this.diasHorarios=new diasHorarios();
    this.listaAuxAdd=new Array<especialidad>();
    
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
      horario: ['', Validators.required],
      lunes:[''],
      martes:[''],
      miercoles:[''],
      jueves:[''],
      viernes:[''],
      sabado:[''],
    });
  }

  public especialidadChange(especi:especialidad){
     
    const data = localStorage.getItem('listaAux');
    if (data){
      this.listaAux=JSON.parse(data);
    }
    this.listaEspecialidad.forEach(esp=>{
      if((esp.idEspecialidad==especi.idEspecialidad)&&esp.add==false)
      {
        especi.add=true;
        this.listaAux.push(especi);
      }else{
          this.listaAux.forEach(item=>{
             item.add=false;
           });
      }
    });

    //guardo la lista
    localStorage.setItem('listaAux', JSON.stringify(this.listaAux));

  }

  public cargoEspecialidades()
  {

    const data = localStorage.getItem('listaAux');
    if (data){
      this.listaAux=JSON.parse(data);
    }
    this.listaAuxFinal=new Array<especialidad>();
    this.listaAux.forEach(item=>{
      if(item.add==true){
        this.listaAuxFinal.push(item);
      }
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
      this.cargoEspecialidades();
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
      this.profesional.especialidades =this.listaAuxFinal;
      this.profesional.nacionalidad = this.form.get('nacionalidad').value;
      this.diasHorarios.lunes=this.form.get('lunes').value;
      this.diasHorarios.martes=this.form.get('martes').value;
      this.diasHorarios.miercoles=this.form.get('miercoles').value;
      this.diasHorarios.jueves=this.form.get('jueves').value;
      this.diasHorarios.viernes=this.form.get('viernes').value;
      this.diasHorarios.sabado=this.form.get('sabado').value;
      this.profesional.diasHorarios=this.diasHorarios;

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
