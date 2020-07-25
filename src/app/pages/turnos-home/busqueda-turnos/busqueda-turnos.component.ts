import { Component, OnInit, ViewChild } from '@angular/core';
import { turno } from 'src/app/model/turno';
import { usuario } from 'src/app/model/usuario';
import { TurnosService } from 'src/app/services/turnos.service';
import { profesional } from 'src/app/model/profesional';
import { paciente } from 'src/app/model/paciente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-busqueda-turnos',
  templateUrl: './busqueda-turnos.component.html',
  styleUrls: ['./busqueda-turnos.component.scss']
})
export class BusquedaTurnosComponent implements OnInit {


  public listaTurnosPaciente: turno[];
  user:usuario;
  isLogueado:boolean;
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
  selectedProfesional = 4;
  filterPost:string;
  dataFiltros: turno[];

  data: Object[];
  fecha:string;
  hora:string;
  paciente:string;
  especialidad:string;
  motivo:string;

  constructor(private turnosService:TurnosService,private router:Router,private fb: FormBuilder) {   
    this.obtenerUsuarioActual();
    this.cargarLista();
    this.filterPost ="";
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

   public verObservaciones(turnoTab:turno){

    //si existe lo borro
    localStorage.removeItem('TurnoSeleccionado');
    this.turnoSeleccionado=new turno();
    this.turnoSeleccionado=turnoTab;
    localStorage.setItem('TurnoSeleccionado', JSON.stringify(this.turnoSeleccionado));
    this.router.navigate(['/turnoObservacionDetalle']);
  
  }

   public cargarLista() {
    this.turnosService.ListarTurnosPacientesTodos()
     .subscribe(
      data => {
        this.listaTurnosPaciente = data;
        this.dataFiltros = this.listaTurnosPaciente;            
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
      comentario: ['', Validators.required]
    });
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");

  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }

  turnosTodos = [];
  traerTurnos(){
    // this.firebase.getTurnosXProf(this.profe).subscribe(resul => {
    //   resul.forEach(data =>{
    //     this.turnosTodos.push(
    //       {
    //         id: data.payload.doc.data().id,
    //         fecha: data.payload.doc.data().fecha,
    //         hora: data.payload.doc.data().hora,
    //         paciente: data.payload.doc.data().paciente,
    //         especialidad: data.payload.doc.data().especialidad,
    //         atendido: data.payload.doc.data().atendido,
    //         estado: data.payload.doc.data().estado,
    //         hclinica: data.payload.doc.data().hclinica,
    //         profesional: data.payload.doc.data().profesional
    //       }
    //     );
    //   });
    //  this.dataSource = new MatTableDataSource(this.turnosTodos);
    //});
    //this.dataSource=null;
  }

  aceptar(e){
    if(e.estado == "pendiente"){
      e.estado = "confirmado";
      // this.firebase.updateTurno(e.id, e).then(resul =>{
      //   console.log("OK")
      //   this.firebase.updateTurnoXProf(e.id, e).then(resul=>{
      //     console.log("OK2");
      //   }).catch(error =>{console.log(error)});
      // }).catch(error=>{console.log(error)});
      //this.actualizarTurno(e);
    }else{
      console.log(`El turno está ${e.estado}`)
    }
    
  }
  
  rechazar(e){
    if(e.estado !== "rechazado"){
      e.estado = "rechazado";
      // this.firebase.updateTurno(e.id, e).then(resul =>{
      //   console.log("OK")
      //   this.firebase.updateTurnoXProf(e.id, e).then(resul=>{
      //     console.log("OK2");
      //   }).catch(error =>{console.log(error)});
      // }).catch(error=>{console.log(error)});
      //this.actualizarTurno(e);
    }else{
      console.log(`El turno ya está ${e.estado}`)
    }
    
  }

  actualizarTurno(turno: any){
    
    for(let t of this.turnosTodos){
      if (t.id === turno.id) {
        t.estado = turno.estado;
      }
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
   // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  exportarAsXlsx():void{
    // this.exporter.exportToExcel(this.dataSource.data, 'turnos');
  }

  exportarAsXlsxFilter():void{
    // this.exporter.exportToExcel(this.dataSource.filteredData, 'turnos_filtrados');
  }

}
