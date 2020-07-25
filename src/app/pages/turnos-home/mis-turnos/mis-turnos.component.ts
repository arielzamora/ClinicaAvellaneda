import { Component, OnInit, ViewChild } from '@angular/core';
import { turno } from 'src/app/model/turno';
import { usuario } from 'src/app/model/usuario';
import { TurnosService } from 'src/app/services/turnos.service';
import { profesional } from 'src/app/model/profesional';
import { paciente } from 'src/app/model/paciente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss']
})
export class MisTurnosComponent implements OnInit {

  public listaTurnosPaciente: turno[];
  user:usuario;
  isLogueado:boolean;
  profesionalStorage:profesional;
  pacienteStorage:paciente;
  Observacion:string;
  @ViewChild('modalRes') modalResena;
  @ViewChild('modalObs') modalObservaciones;
  submitted = false;
  get f() { return this.form.controls; }
  public form: FormGroup;
  public errorMessage: string;
  public error: boolean;
  public success: boolean;
  turnoSeleccionado:turno;
  selectedProfesional = 4;
  constructor(private turnosService:TurnosService,private router:Router,private fb: FormBuilder) {   
    this.obtenerUsuarioActual();
    this.cargarLista();
   }

   obtenerUsuarioActual()
   {
    const data = localStorage.getItem('Login');
     const dataUsuario = localStorage.getItem('LoginUsuario');
     this.user=JSON.parse(data);
     this.isLogueado=true;

     switch(this.user.tipo)
     {
        case "paciente":{
          this.pacienteStorage=JSON.parse(dataUsuario);
          break;
        }
        case "profesional":{
          this.profesionalStorage=JSON.parse(dataUsuario);
          break;
        }


     }
   }
  public cargarLista() {
    this.turnosService.ListarTurnosPacientes(this.pacienteStorage[0].idPaciente)
     .subscribe(
      data => {
        this.listaTurnosPaciente = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  public guardarResena(turnoTab:turno){

    localStorage.removeItem('TurnoEncuesta');
    this.turnoSeleccionado=new turno();
    this.turnoSeleccionado=turnoTab;

    localStorage.setItem('TurnoEncuesta', JSON.stringify(this.turnoSeleccionado));
    this.router.navigate(['/turnosEncuesta']);
  
  }
  public verObservaciones(turno:turno){
    if(turno.observaciones){
      this.Observacion=turno.observaciones;
    }else
    {
      this.Observacion="su profesional de salud aun no ha emitido una observacion sobre su turno o este aun no fue tomado";
    }
    
    this.modalObservaciones.show();  
  }
  public cancelarTurno(turnoTab:turno){

    this.turnoSeleccionado = new turno();
    this.turnoSeleccionado = turnoTab;
    this.turnoSeleccionado.estado = "cancelado"
    this.turnoSeleccionado.observaciones = "turno cancelado por el paciente";
 

    this.turnosService.actualizar(this.turnoSeleccionado)
      .then(
        response => {
          console.log(response);
          if (response) {
             
            this.success = true;
            this.form.reset();

            this.modalResena.hide();
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
  
  }
 public guardarComentario()
 {
  this.errorMessage = '';
  this.error = false;
  this.success = false;
  this.submitted=true;

  if (this.form.valid ) {
    
    this.turnoSeleccionado.resenia= this.form.get('comentario').value;
    this.turnoSeleccionado.puntosProfesional=this.selectedProfesional;
    this.turnosService.actualizar(this.turnoSeleccionado)
      .then(
        response => {
          console.log(response);
          if (response) {
             
            this.success = true;
            this.form.reset();

            this.modalResena.hide();
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

  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  ngOnInit() {
    this.form = this.fb.group({
      comentario: ['', Validators.required]
    });
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");

  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }

}
