import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { profesional } from 'src/app/model/profesional';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ProfesionalService} from 'src/app/services/profesional.service';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { especialidad } from 'src/app/model/especialidad';
import {diasHorarios}from 'src/app/model/diashorarios';
import { especialidadProfesional } from 'src/app/model/especialidadProfesional';

@Component({
  selector: 'app-edit-profesional',
  templateUrl: './edit-profesional.component.html',
  styleUrls: ['./edit-profesional.component.scss']
})
export class EditProfesionalComponent implements OnInit {

  profesional:profesional;
  @Input() showEdit: boolean;
  @Input() profeInput: profesional;
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
  especialidadPro:especialidadProfesional;
  listaEspecialidad: especialidad[];
  listaAuxAdd: especialidad[];
  listaAuxFinal: especialidadProfesional[];
  listaAux=new Array<especialidad>();
  constructor(private fb: FormBuilder,private especialidaService:EspecialidadService, private profesionalService:ProfesionalService) {
    this.listaAux=new Array<especialidad>();
    this.closeModal = new EventEmitter<void>();
    this.registradoCorrectamente = new EventEmitter<any>();
    this.cargarLista();     
    this.diasHorarios=new diasHorarios();
    this.listaAuxAdd=new Array<especialidad>();
    
  }

  ngOnInit() {

    this.form = this.fb.group({
      idProfesionalEdit: ['', Validators.required],
      nombreEdit: ['', Validators.required],
      apellidoEdit: ['', Validators.required],
      emailEdit: ['', Validators.required],
      passwordEdit: ['', Validators.required],
      tipoDniEdit: ['', Validators.required],
      sexoEdit: ['', Validators.required],
      dniEdit: ['', Validators.required],
      edadEdit: ['', Validators.required],
      especialidadEdit: ['', Validators.required],
      nacionalidadEdit: ['', Validators.required],
      horarioEdit: ['', Validators.required],
      lunesEdit:[''],
      martesEdit:[''],
      miercolesEdit:[''],
      juevesEdit:[''],
      viernesEdit:[''],
      sabadoEdit:[''],
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
      }
    });

    //guardo la lista
    localStorage.setItem('listaAux', JSON.stringify(this.listaAux));

  }

  public cargoEspecialidades(idProfesional:string)
  {
    
    const data = localStorage.getItem('listaAux');
    if (data){
      this.listaAux=JSON.parse(data);
    }
    this.listaAuxFinal=new Array();
    this.listaAux.forEach(item=>{
      if(item.add==true){
        this.especialidadPro=new especialidadProfesional();
        this.especialidadPro.idEspecialidad=item.idEspecialidad,
        this.especialidadPro.idProfesional=idProfesional,
        this.especialidadPro.nombre=item.nombre,
        this.especialidadPro.activa=item.activa,
        this.especialidadPro.usuarioAlta=item.usuarioAlta,
        this.especialidadPro.usuarioAprobacion=""
        this.listaAuxFinal.push(this.especialidadPro);
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
      this.cargoEspecialidades(this.form.get('idProfesional').value);
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
              this.listaAuxFinal.forEach(item=>{
                this.profesionalService.RegistrarEspecialidadesProfesionales(item);
              }); 
               
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
