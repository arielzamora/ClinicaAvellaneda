import { Component, OnInit } from '@angular/core';
import { Input,Output, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { especialidad } from 'src/app/model/especialidad';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { usuario } from 'src/app/model/usuario';
import { stringify } from 'querystring';
import { analytics } from 'firebase';

@Component({
  selector: 'app-alta-especialidades',
  templateUrl: './alta-especialidades.component.html',
  styleUrls: ['./alta-especialidades.component.scss']
})
export class AltaEspecialidadesComponent implements OnInit {


  especialidad:especialidad;
  @Input() showModalAlta: boolean;
  @Output() closeModal: EventEmitter<void>;
  dia:any;
  mes:any;
  año:any;
  submitted = false;
  get f() { return this.form.controls; }
  @Output() registradoCorrectamente: EventEmitter<any>;
  public form: FormGroup;
  public key: string;
  public errorMessage: string;
  public error: boolean;
  public success: boolean;
  focus:any;
  user:usuario;

  constructor(private fb: FormBuilder, private especialidadService:EspecialidadService) {

    this.closeModal = new EventEmitter<void>();
    this.registradoCorrectamente = new EventEmitter<any>();
    this.obtenerUsuarioActual();
  
  }

  ngOnInit() {
    this.form = this.fb.group({
      idEspecialidad: ['', Validators.required],
      nombre: ['', Validators.required],
    });
  }

  obtenerUsuarioActual()
  {
    const data = localStorage.getItem('Login');
    this.user=JSON.parse(data);
  }
  Submit() {
    this.errorMessage = '';
    this.error = false;
    this.success = false;
    this.submitted=true;

    if (this.form.valid ) {
      this.especialidad=new especialidad();
      this.especialidad.idEspecialidad = this.form.get('idEspecialidad').value;
      this.especialidad.nombre = this.form.get('nombre').value;
      this.especialidad.usuarioAlta=this.user.nombre;
      if(this.user.tipo="admin"){
        this.especialidad.activa=true;
        this.especialidad.usuarioAprobacion=this.user.tipo;
      }else{
        this.especialidad.activa=false;
      }
      this.especialidad.fechaAlta=this.getDateFecha();
      

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

 getDateFecha()
  {

      var today = new Date();
      this.dia = today.getDate();

     this.mes = today.getMonth()+1; 
     this.año = today.getFullYear();
    if(this.dia<10) 
    {
      this.dia ='0'+this.dia;
    } 

    if(this.mes<10) 
    {
      this.mes='0'+this.mes;
    } 
    return this.dia+'/'+this.mes+'/'+this.año;
  }
}
