import { Component, OnInit, ViewChild } from '@angular/core';
import { turno } from 'src/app/model/turno';
import { usuario } from 'src/app/model/usuario';
import { TurnosService } from 'src/app/services/turnos.service';
import { profesional } from 'src/app/model/profesional';
import { paciente } from 'src/app/model/paciente';
import {FormArray, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as PDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';

@Component({
  selector: 'app-turnos-home',
  templateUrl: './turnos-home.component.html',
  styleUrls: ['./turnos-home.component.scss']
})
export class TurnosHomeComponent implements OnInit {
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
  options: Object = {
    fieldSeparator: ';',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    headers: ['Fecha', 'Hora', 'Profesional', 'Estado'],
    showTitle: true,
    title: 'Listado de turnos',
    useBom: true,
    removeNewLines: true,
    keys: ['fecha', 'hora', 'profesional', 'estado']
  };
  data: Object[];
  fecha:string;
  hora:string;
  paciente:string;
  especialidad:string;
  motivo:string;
  addObservacion1:boolean;
  addObservacion2:boolean;
  addObservacion3:boolean;
  constructor(private turnosService:TurnosService,
              private router:Router,
              private fb: FormBuilder) {   
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

  public verObservacion(turnoTab:turno){

    //si existe lo borro
    localStorage.removeItem('TurnoSeleccionado');
    this.turnoSeleccionado=new turno();
    this.turnoSeleccionado=turnoTab;
    this.fecha=turnoTab.fecha;
    this.hora=turnoTab.hora;
    this.paciente=turnoTab.paciente;
    this.especialidad=turnoTab.especialidad;
    this.motivo=turnoTab.motivo;
    localStorage.setItem('TurnoSeleccionado', JSON.stringify(this.turnoSeleccionado));
    this.router.navigate(['/turnoObservacion']);
  
  }

  public verComentarios(turno:turno){
    if(turno.resenia){
      this.Observacion=turno.resenia;
    }else
    {
      this.Observacion="El Paciente no ha dejado un comentario sobre la atencion recibida";
    }
    
    this.modalObservaciones.show();  
  }

  public rechazarTurno(turnoTab:turno)
    {
      this.turnoSeleccionado = new turno();
      this.turnoSeleccionado = turnoTab;
      this.turnoSeleccionado.estado = "rechazado"
      this.turnoSeleccionado.observaciones = "Su turno a sido rechazado por el Profesional,comuniquese con la central de turnos para mas informacion";
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
  public cancelarTurno(turnoTab:turno){

    this.turnoSeleccionado = new turno();
    this.turnoSeleccionado = turnoTab;
    this.turnoSeleccionado.estado = "cancelado"
    this.turnoSeleccionado.observaciones = "Su turno a sido cancelado por el Profesional,comuniquese con la central de turnos para mas informacion";

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
 public onSubmit()
 {
  this.errorMessage = '';
  this.error = false;
  this.success = false;
  this.submitted=true;

  var atendido=this.form.get('atendido').value

  if (this.form.valid ) {
    
    this.turnoSeleccionado.observaciones = this.form.get('observacion').value;
    if(atendido){
      this.turnoSeleccionado.estado = "cerrado";
    }

    
    this.turnoSeleccionado.clave1=this.form.get('clave1').value;
    this.turnoSeleccionado.clave2=this.form.get('clave2').value;
    this.turnoSeleccionado.clave3=this.form.get('clave3').value;
    this.turnoSeleccionado.valor1=this.form.get('valor1').value;
    this.turnoSeleccionado.valor2=this.form.get('valor2').value;
    this.turnoSeleccionado.valor3=this.form.get('valor3').value;
     
    this.turnosService.actualizarInfo(this.turnoSeleccionado)
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
 generarNombreCsv(): string {
  const nombre = 'ListaTurnos ' + new Date().toDateString();
  return nombre;
}
 public generarPDF()  
  {  
    var data = document.getElementById('tablaPDF');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
     
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new PDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.setTextColor(0, 0, 255);
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('PDFTurnos.pdf'); // Generated PDF   
    });  
  }  
  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }

  ngOnInit() {
    this.form = this.fb.group({
      clave1: ['', ],
      valor1: ['', ],
      clave2: ['', ],
      valor2: ['', ],
      clave3: ['', ],
      valor3: ['', ],
      observacion:['', ],
      atendido: ['', ]
    });
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");

  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }

}
