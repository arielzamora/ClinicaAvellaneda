import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { profesional } from 'src/app/model/profesional';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { diasHorarios } from 'src/app/model/diashorarios';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { ProfesionalService } from 'src/app/services/profesional.service';
import { especialidad } from 'src/app/model/especialidad';
import { usuario } from 'src/app/model/usuario';
import { especialidadProfesional } from 'src/app/model/especialidadProfesional';
import { moment } from 'ngx-bootstrap/chronos/test/chain';
import { stringify } from 'querystring';
import { storage } from 'firebase';
import { paciente } from 'src/app/model/paciente';
import { turno } from 'src/app/model/turno';
import { TurnosService } from 'src/app/services/turnos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-turno',
  templateUrl: './registro-turno.component.html',
  styleUrls: ['./registro-turno.component.scss']
})
export class RegistroTurnoComponent implements OnInit {

  profesional:profesional;

  submitted = false;
  get f() { return this.form.controls; }
  @Output() registradoCorrectamente: EventEmitter<any>;
  public form: FormGroup;
  public key: string;
  public errorMessage: string;
  public error: boolean;
  public success: boolean;
  onDias:boolean;
  onTurnos:boolean;
  public diasHorarios:diasHorarios;
  listaEspecialidad: especialidadProfesional[];
  listaEspecialidadFiltrada: especialidadProfesional[];
  listaEspecialidadAux: especialidadProfesional[];
  listaProfesioanal: profesional[];
  listaProfes: profesional[];
  profesionalItem:profesional;
  profesionalStorage:profesional;
  pacienteStorage:paciente;
  user:usuario;
  isLogueado:boolean;
  listadoDias:any;
  listadoTurnoDias:any;
  listadoTurnoDiasAux:any;
  listadoHorarios:any;
  hoy:Date;
  limiteDate:Date;
  especialidadSeleccionada:any;
  especialidadSelNombre:any;
  profesionalSelNombre:any;
  turno:turno;
  constructor(private fb: FormBuilder,
    private especialidaService:EspecialidadService,
    private profesionalService:ProfesionalService,
    private router:Router,
    private turnoService:TurnosService) {
    this.cargarListaEspecialidad(); 
    this.cargarListaProfesional();
    this.listaProfes=new Array();
    this.listaEspecialidadFiltrada=new Array();
    
    this.diasHorarios=new diasHorarios();
    this.obtenerUsuarioActual();
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
          this.profesional=JSON.parse(dataUsuario);
          break;
        }


     }

   }

   public cargarListaEspecialidad() {
    var existe=false;
    this.especialidaService.ListarProfesionalesXespecialidad()
     .subscribe(
      data => {
        this.listaEspecialidad = data;
        //filtro los distintos
        this.listaEspecialidad.forEach(esp=>{
          if(!this.listaEspecialidadFiltrada.some(e=>e.idEspecialida.toString()==esp.idEspecialida.toString()))
          {
            this.listaEspecialidadFiltrada.push(esp);
          }       
         });
    
      },
      error => {
        console.log(error);
      }
    );


  }
  public RegistrarTurno(): void {
    this.errorMessage = '';
    this.error = false;
    this.success = false;
    this.submitted=true;
    if (this.form.valid) {

     this.turno=new turno();

     this.turno.fecha = this.form.get('dia').value;
     this.turno.hora = this.form.get('hora').value;
     this.turno.especialidad = this.especialidadSelNombre;
     this.turno.idEspecialidad = this.form.get('especialidad').value;
     this.turno.paciente = this.pacienteStorage[0].nombre;
     this.turno.idPaciente=this.pacienteStorage[0].idPaciente;
     this.turno.idProfesional=this.form.get('profesional').value;
     this.turno.profesional=this.profesionalSelNombre;
     this.turno.motivo=this.form.get('motivo').value;
     this.turno.estado="pendiente";
     this.turno.resenia="";
     this.turno.observaciones=""; 
     
      this.turnoService.Registrar(this.turno)
        .then(response=>{
          if(response){
            this.success = true;
            this.router.navigate(['/bienvenida']);
          }
          }
        )
        .catch(
          response => {
            this.error = true;
            this.isLogueado=false;
            this.errorMessage = response.message;
          }
        );
    } else {
      this.isLogueado=false;
      this.errorMessage = 'Debe completar los campos correctamente.';
      this.error = true;
    }
  }
  public cargarListaProfesional() {
    this.profesionalService.Listar()
     .subscribe(
      data => {
        
        this.listaProfesioanal = data;
      },
      error => {
        console.log(error);
      }
    );

 
  }

  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }

  public especialidadChange(espo:any){

    this.especialidadSeleccionada=espo.target.value;
    this.listaEspecialidadAux=new Array();
       this.listaEspecialidad.forEach(item=>{
      if(item.idEspecialida.toString()==this.especialidadSeleccionada.toString()){
       
         this.listaEspecialidadAux.push(item);
         this.especialidadSelNombre=item.nombre;
        }         
       });
  }

  public diaChange(espo:any)
  {

    var res=espo.target.value;

    var turnoHorario=this.profesionalItem.horario.split('-');
    var horaDesde=turnoHorario[0]+':00';
    var horaHasta=turnoHorario[1]+':00';
    var desde=this.diasHorarios.horarios.indexOf(horaDesde);
    var hasta=this.diasHorarios.horarios.indexOf(horaHasta);

    this.listadoHorarios=this.diasHorarios.horarios.slice(desde,hasta);

  }

  public profesionalChange(espo:any){
    var res=espo.target.value;
    this.listaProfesioanal.forEach(item=>{
      if(item.idProfesional.toString()==res.toString())
      {
        //cargo el profesioanal
        this.profesionalItem=item;

      }
    })
    this.onDias=true;
    this.onTurnos=true;
    this.getDate();
    this.profesionalSelNombre=this.profesionalItem.nombre+' '+this.profesionalItem.apellido
    this.cargoDias(this.profesionalItem);
  }
  public cargoDias(prof:profesional){
    this.listadoTurnoDias=new Array();
    this.listadoTurnoDiasAux=new Array();
    //agrego los dias que el profesional atiende

    this.listadoDias.forEach(item=>{

      this.listadoTurnoDiasAux.push(
        {
          profesional:prof.nombre,
          idProfesional:prof.idProfesional,
          especialidad:this.especialidadSeleccionada,
          dia:item.dia,
          fecha:item.fecha
        }
      ); 
    });

      this.listadoTurnoDiasAux.forEach(item=>{

        if((prof.diasHorarios.lunes)&&(item.dia.toString()=="lunes")){
          this.listadoTurnoDias.push(item);
        }
        if((prof.diasHorarios.martes)&&(item.dia.toString()=="martes")){
          this.listadoTurnoDias.push(item);
        }
        if((prof.diasHorarios.miercoles)&&(item.dia.toString()=="miercoles")){
          this.listadoTurnoDias.push(item);
        }
        if((prof.diasHorarios.jueves)&&(item.dia.toString()=="jueves")){
          this.listadoTurnoDias.push(item);
        }
        if((prof.diasHorarios.viernes)&&(item.dia.toString()=="viernes")){
          this.listadoTurnoDias.push(item);
        }
        if((prof.diasHorarios.sabado)&&(item.dia=="sabado")){
          this.listadoTurnoDias.push(item);
        }

      });


  }

  public getDate() {
    var startDate = new Date(); //YYYY-MM-DD
    var endDate = new Date(startDate); //YYYY-MM-DD
    endDate.setDate(endDate.getDate()+15);

        this.listadoDias = new Array();
        var dt = new Date(startDate);
        while (dt <= endDate) {
          this.listadoDias.push({
            dia:this.getDia(dt.getUTCDay()),
            fecha:dt.getDate().toString()+"/"+(dt.getMonth()+1).toString()+"/"+dt.getUTCFullYear().toString(),
          });
            dt.setDate(dt.getDate() + 1);
        }
        return this.listadoDias;

  }
  public getDia(dia:number):string{
    var diaSemana;
    switch(dia)
    {
      case 0:{
        diaSemana="domingo";
      break;
      }
      case 1:{
        diaSemana="lunes";
        break;
        }
        case 2:{
          diaSemana="martes";
          break;
          }
          case 3:{
            diaSemana="miercoles";
            break;
            }
            case 4:{
              diaSemana="jueves";
              break;
              }
              case 5:{
                diaSemana="viernes";
                break;
                }
                case 6:{
                  diaSemana="sabado";
                  break;
                  }

    }
    return diaSemana;

  }
  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");
    this.form = this.fb.group({
      especialidad: ['', Validators.required],
      profesional: ['', Validators.required],
      dia: ['', Validators.required],
      hora: ['', Validators.required],
      motivo: ['', Validators.required]

    });

  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }

}
