import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { profesional } from 'src/app/model/profesional';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ProfesionalService} from 'src/app/services/profesional.service';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { especialidad } from 'src/app/model/especialidad';
import {diasHorarios}from 'src/app/model/diashorarios';
import { especialidadProfesional } from 'src/app/model/especialidadProfesional';
import { Observable } from 'rxjs';
import {AngularFireStorage}from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
  especialidadPro:especialidadProfesional;
  listaEspecialidad: especialidad[];
  listaAuxAdd: especialidad[];
  listaAuxFinal: especialidadProfesional[];
  listaAux=new Array<especialidad>();
  imagenUser:any;
  urlImage:string;
  uploadPercent: Observable<number>;
  constructor(private fb: FormBuilder,
    private router:Router,
    private auth:AuthService,
    private fireStore:AngularFireStorage,
    private especialidaService:EspecialidadService,
    private profesionalService:ProfesionalService) {
    this.listaAux=new Array<especialidad>();
    this.closeModal = new EventEmitter<void>();
    this.registradoCorrectamente = new EventEmitter<any>();
    this.cargarLista();     
    this.diasHorarios=new diasHorarios();
    this.listaAuxAdd=new Array<especialidad>();
    this.showModalAlta=true;
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
      imagen:[''],
      imagenUser: [''],
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
      }
    });

    //guardo la lista
    localStorage.setItem('listaAux', JSON.stringify(this.listaAux));

  }

  public cargoEspecialidades(prof:profesional)
  {
    
    const data = localStorage.getItem('listaAux');
    if (data){
      this.listaAux=JSON.parse(data);
    }
    this.listaAuxFinal=new Array();
    this.listaAux.forEach(item=>{
      if(item.add==true){
        this.especialidadPro=new especialidadProfesional();
        this.especialidadPro.idEspecialida=item.idEspecialidad,
        this.especialidadPro.idProfesional=prof.idProfesional,
        this.especialidadPro.nombre=item.nombre,
        this.especialidadPro.nombreProfesional=prof.nombre+'-'+prof.apellido,
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
      this.profesional.urlImage=this.urlImage;

      this.cargoEspecialidades(this.profesional);
    //registro las especialidades
      this.listaAuxFinal.forEach(item=>{
        this.profesionalService.RegistrarEspecialidadesProfesionales(item);
      }); 

      //registro el profesional
      this.profesionalService.RegistrarProfesional(this.profesional);

      //registro el usuario 
      this.profesionalService.Registrar(this.profesional)
        .then(response => {
              
              this.success = true;
              this.form.reset();
              this.cerrar();
              this.auth.logout();
              this.router.navigate(['/login']);

              this.registradoCorrectamente.emit();
              this.cerrar();
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

  onUpload(e)
  {
    //creamos un id aleatorio para poder asociarlo a la imagen
    const id = Math.random().toString(36).substring(2);
    const file=e.target.files[0];
    const filePath = 'profesionales/profile_'+id;
    const ref=this.fireStore.ref(filePath);
    const task=this.fireStore.upload(filePath,file)
    this.uploadPercent=task.percentageChanges();//recuperamos el porcentaje de carga del archivo
    task.snapshotChanges().pipe(finalize(()=>
     ref.getDownloadURL().subscribe(url=>{
      this.urlImage = url})      
    )
    ).subscribe();
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
