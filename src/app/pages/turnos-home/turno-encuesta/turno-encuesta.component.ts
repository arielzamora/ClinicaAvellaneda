import { Component, OnInit, ViewChild } from '@angular/core';
import { turno } from 'src/app/model/turno';
import { usuario } from 'src/app/model/usuario';
import { TurnosService } from 'src/app/services/turnos.service';
import { profesional } from 'src/app/model/profesional';
import { paciente } from 'src/app/model/paciente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import noUiSlider from "nouislider";

@Component({
  selector: 'app-turno-encuesta',
  templateUrl: './turno-encuesta.component.html',
  styleUrls: ['./turno-encuesta.component.scss']
})
export class TurnoEncuestaComponent implements OnInit {

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
  fecha:string;
  hora:string;
  paciente:string;
  especialidad:string;
  motivo:string;
  constructor(private turnosService:TurnosService,private router:Router,private fb: FormBuilder) {   
    this.obtenerUsuarioActual();
    this.cargarLista();
   }

   obtenerUsuarioActual()
   {
    const data = localStorage.getItem('Login');
     const dataUsuario = localStorage.getItem('LoginUsuario');
     const dataTurno = localStorage.getItem('TurnoEncuesta');
     this.user=JSON.parse(data);
     this.isLogueado=true;

     this.turnoSeleccionado=JSON.parse(dataTurno);

    this.fecha=this.turnoSeleccionado.fecha;
    this.hora=this.turnoSeleccionado.hora;
    this.paciente=this.turnoSeleccionado.paciente;
    this.especialidad=this.turnoSeleccionado.especialidad;
    this.motivo=this.turnoSeleccionado.motivo;


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

   public guardarComentario()
 {
  this.errorMessage = '';
  this.error = false;
  this.success = false;
  this.submitted=true;

  if (this.form.valid ) {
    
    this.turnoSeleccionado.completoEncuesta=true;
    this.turnoSeleccionado.resenia= this.form.get('comentario').value;
    this.turnoSeleccionado.puntosProfesional=this.selectedProfesional; 
    this.turnoSeleccionado.puntosLugar=localStorage.getItem('RangoEncuesta');   
    this.turnoSeleccionado.recibeInfo= this.form.get('recibeInfo').value;
    this.turnoSeleccionado.recomienda= this.form.get('recomienda').value;
    this.turnoSeleccionado.noRecomienda= this.form.get('noRecomienda').value;

    this.turnosService.actualizarConEncuesta(this.turnoSeleccionado)
      .then(
        response => {
          console.log(response);
          if (response) {
             
            this.success = true;
            this.form.reset();
            this.router.navigate(['/bienvenida']);
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


  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  ngOnInit() {
    this.form = this.fb.group({
      comentario: ['', Validators.required],
      recibeInfo: ['',],
      recomienda: ['', ],
      noRecomienda: ['', ]
    });
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");
    var slider = document.getElementById("sliderRegular") as noUiSlider.Instance;
    let value;
    noUiSlider.create(slider, {
      start: 20,
      connect: true,
      range: {
        min: 0,
        max: 100
      }
    });
    //this.rango="20";
    var rango = document.getElementById('slider-span');

    slider.noUiSlider.on('update', function (values, handle) {
     
      value = values[handle];

        rango.innerHTML = value;
        localStorage.setItem('RangoEncuesta', JSON.stringify(value));

   });

  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }

}
