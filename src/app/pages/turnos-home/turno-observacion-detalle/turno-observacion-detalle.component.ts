import { Component, OnInit, ViewChild } from '@angular/core';
import { turno } from 'src/app/model/turno';
import { usuario } from 'src/app/model/usuario';
import { TurnosService } from 'src/app/services/turnos.service';
import { profesional } from 'src/app/model/profesional';
import { paciente } from 'src/app/model/paciente';
import {FormArray, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { $ } from 'protractor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-turno-observacion-detalle',
  templateUrl: './turno-observacion-detalle.component.html',
  styleUrls: ['./turno-observacion-detalle.component.scss']
})
export class TurnoObservacionDetalleComponent implements OnInit {
  public listaTurnosPaciente: turno[];
  user:usuario;
  isLogueado:boolean;
  opcional:boolean;
  profesionalStorage:profesional;
  pacienteStorage:paciente;
  Observacion:string;

  submitted = false;
  get f() { return this.form.controls; }
  public form: FormGroup;
  public errorMessage: string;
  public error: boolean;
  public success: boolean;
  turnoSeleccionado:turno;
  data: Object[];
  fecha:string;
  rangoValor:string;
  hora:string;
  paciente:string;
  especialidad:string;
  motivo:string;
  addObservacion1:boolean;
  addObservacion2:boolean;
  addObservacion3:boolean;
  clave1:string;
  valor1:string;
  clave2:string;
  valor2:string;
  clave3:string;
  valor3:string;
  clave4:string;
  valor4:string;
  clave5:string;
  valor5:string;
  tieneClave1:boolean;
  tieneClave2:boolean;
  tieneClave3:boolean;
  tieneClave4:boolean;
  tieneClave5:boolean;
  edad:string;
  presion:string;
  temperatura:string;
  observacion:string;
  resenia:string;
  puntosProfesional:number;
  puntosLugar:string;
  recibeInfo:boolean;
  recomienda:boolean;
  completoEncuesta:boolean;
  constructor(private turnosService:TurnosService,private router:Router,private fb: FormBuilder) {   
    this.obtenerUsuarioActual();
   // this.cargarLista();
   }

  ngOnInit(): void {
    this.form = this.fb.group({
      clave1: ['', ],
      valor1: ['', ],
      clave2: ['', ],
      valor2: ['', ],
      clave3: ['', ],
      valor3: ['', ],
      clave4: ['', ],
      valor4: ['', ],
      clave5: ['', ],
      valor5: ['', ],
      edad:['',],
      presion:['',],
      temperatura:['',],
      observacion:['', ]
    });
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");

  }
  obtenerUsuarioActual()
  {
    const data = localStorage.getItem('Login');
    const dataUsuario = localStorage.getItem('LoginUsuario'); 
    const dataTurno = localStorage.getItem('TurnoSeleccionado');
    this.user=JSON.parse(data);
    this.isLogueado=true;
    this.turnoSeleccionado=JSON.parse(dataTurno);

    this.fecha=this.turnoSeleccionado.fecha;
    this.hora=this.turnoSeleccionado.hora;
    this.paciente=this.turnoSeleccionado.paciente;
    this.especialidad=this.turnoSeleccionado.especialidad;
    this.motivo=this.turnoSeleccionado.motivo;
    this.temperatura=this.turnoSeleccionado.temperatura;
    this.edad=this.turnoSeleccionado.edad;
    this.presion=this.turnoSeleccionado.presion;
    if(this.turnoSeleccionado.clave1){
      this.tieneClave1=true;
      this.clave1=this.turnoSeleccionado.clave1;
      this.valor1=this.turnoSeleccionado.valor1;
    }   
    if(this.turnoSeleccionado.clave2){
      this.tieneClave2=true;
      this.clave2=this.turnoSeleccionado.clave2;
      this.valor2=this.turnoSeleccionado.valor2;
    }
    if(this.turnoSeleccionado.clave3){
      this.tieneClave3=true;
      this.clave3=this.turnoSeleccionado.clave3;
      this.valor3=this.turnoSeleccionado.valor3;
    }
    if(this.turnoSeleccionado.clave4){
      this.tieneClave4=true;
      this.clave4=this.turnoSeleccionado.clave4;
      this.valor4=this.turnoSeleccionado.valor4;
    }
    if(this.turnoSeleccionado.clave5){
      this.tieneClave5=true;
      this.clave5=this.turnoSeleccionado.clave5;
      this.valor5=this.turnoSeleccionado.valor5;
    }
    if(this.turnoSeleccionado.completoEncuesta){
      
      this.completoEncuesta=true;
      this.resenia=this.turnoSeleccionado.resenia;
      this.puntosProfesional=this.turnoSeleccionado.puntosProfesional;
      this.puntosLugar=this.turnoSeleccionado.puntosLugar;
      this.recibeInfo=this.turnoSeleccionado.recibeInfo;
      this.recomienda=this.turnoSeleccionado.recomienda;
    }

    this.profesionalStorage=JSON.parse(dataUsuario);

  }
 public cargarLista() {
   this.turnosService.ListarTurnosProfesional(this.profesionalStorage[0].idProfesional)
    .subscribe(
     data => {
       this.listaTurnosPaciente = data;
       this.data=data;
     },
     error => {
       console.log(error);
     }
   );
 }
public cancelar()
{
  this.form.reset();
  this.router.navigate(['/bienvenida']);
}
 public onSubmit()
 {
  this.errorMessage = '';
  this.error = false;
  this.success = false;
  this.submitted=true;


  if (this.form.valid ) {
    
    this.turnoSeleccionado.observaciones = this.form.get('observacion').value;
    this.turnoSeleccionado.estado = "cerrado";
    this.turnoSeleccionado.edad=this.form.get('edad').value;
    this.turnoSeleccionado.presion=this.form.get('presion').value;
    this.turnoSeleccionado.temperatura=this.form.get('temperatura').value;
    this.turnoSeleccionado.observaciones=this.form.get('observacion').value;

    if(this.form.get('clave1').value===''){
      this.turnoSeleccionado.clave1="";
      this.turnoSeleccionado.valor1="";
    }else{
      this.turnoSeleccionado.clave1=this.form.get('clave1').value;
      this.turnoSeleccionado.valor1=this.form.get('valor1').value;
    }
    if(this.form.get('clave2').value===''){
      this.turnoSeleccionado.clave2="";
      this.turnoSeleccionado.valor2="";
    }else{
      this.turnoSeleccionado.clave2=this.form.get('clave2').value;
      this.turnoSeleccionado.valor2=this.form.get('valor2').value;
    }
    if(this.form.get('clave3').value===''){
      this.turnoSeleccionado.clave3="";
      this.turnoSeleccionado.valor3="";
    }else{
      this.turnoSeleccionado.clave3=this.form.get('clave3').value;
      this.rangoValor = localStorage.getItem('Rango');
      this.turnoSeleccionado.valor3=this.rangoValor; 
    }
    if(this.form.get('clave4').value===''){
      this.turnoSeleccionado.clave4="";
      this.turnoSeleccionado.valor4="";
    }else{
      this.turnoSeleccionado.clave4=this.form.get('clave4').value;
      this.turnoSeleccionado.valor4=this.form.get('valor4').value;
    }
    if(this.form.get('clave5').value===''){
      this.turnoSeleccionado.clave5="";
      this.turnoSeleccionado.valor5="";
    }else{
      this.turnoSeleccionado.clave5=this.form.get('clave5').value;
      this.turnoSeleccionado.valor5=this.form.get('valor5').value;
    }
    
    
    this.turnosService.actualizarInfo(this.turnoSeleccionado)
      .then(
        response => {
          console.log(response);
          if (response) {
             
            this.success = true;
            this.form.reset();
            this.router.navigate(['/bienvenida']);
          } else {
            this.error = true;
            this.errorMessage = "error al actualizar el turno";
          }
        }
      )
      .catch(
        error => {
          this.error = true;
          this.errorMessage = "error al actualizar el turno";
          console.log(error);
        }
      );
  } else {
    this.errorMessage = 'Debe completar los campos correctamente.';
    this.error = true;

  }
 }

}

