import { Component, OnInit, OnDestroy, HostListener, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { paciente } from 'src/app/model/paciente';
import { PacienteService } from 'src/app/services/paciente.service';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { especialidad } from 'src/app/model/especialidad';
import {AngularFireStorage}from '@angular/fire/storage';
import {finalize}from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import { ReCaptcha2Component } from 'ngx-captcha';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit, OnDestroy  {
  isCollapsed = true;
  focus;

  public form: FormGroup;
  paciente:paciente;
  public errorMessage: string;
  public error: boolean;
  public success: boolean;
  submitted = false;

  listaEspecialidad:especialidad[];
  uploadPercent: Observable<number>;
  urlImage:string;
  @ViewChild('captchaElem',{static:true}) captcha: ReCaptcha2Component;
  @ViewChild('inputEmail',{static:true}) inputEmail: ReCaptcha2Component;
  @ViewChild('inputPassword',{static:true}) inputPasword: ReCaptcha2Component;
  key:string;
  rutaImagen:string;
  constructor(private fb: FormBuilder,private router:Router,
    private especialidaService:EspecialidadService,
    private pacienteService:PacienteService,
    private fireStore:AngularFireStorage,
    private auth:AuthService) {
  }
  //@HostListener("document:mousemove", ["$event"])
 
  
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
  ngOnInit() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      tipoDni: ['', Validators.required],
      sexo: ['', Validators.required],
      dni: ['', Validators.required],
      edad: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      planMedico: ['', Validators.required],
      imagen: [''],
      imagenUser: ['']
    });
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("register-page");

    this.onMouseMove(event);
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("register-page");
  }

  public registrarse()
  {
    this.errorMessage = '';
    this.error = false;
    this.success = false;
    this.submitted=true;
    this.paciente=new paciente(); 
    this.paciente.nombre = this.form.get('nombre').value;
    this.paciente.apellido = this.form.get('apellido').value;
    this.paciente.usuario = this.form.get('email').value;
    this.paciente.password = this.form.get('password').value;
    this.paciente.tipo = this.form.get('tipoDni').value;
    this.paciente.dni = this.form.get('dni').value;
    this.paciente.sexo = this.form.get('sexo').value;
    this.paciente.edad = this.form.get('edad').value;
    this.paciente.nacionalidad = this.form.get('nacionalidad').value;
    this.paciente.planMedico= this.form.get('planMedico').value;
    this.paciente.urlImage=this.urlImage;
    this.paciente.activo=true;
    if (this.form.valid ) {

      this.pacienteService.RegistrarPaciente(this.paciente);

      this.pacienteService.Registrar(this.paciente)
      .then(response => {
            this.success = true;
            this.form.reset();
            this.cerrar();
            this.auth.logout();
            this.router.navigate(['/login']);
          }
        ).catch(
        error => {
          this.error = true;
          this.errorMessage = "error al registrar el paciente";
          console.log(error);
        }
      );
      } else {
        this.errorMessage = 'Debe completar los campos correctamente.';
        this.error = true;

      }
}
cerrar() {
  
  this.form.reset();
}
    onUpload(e)
    {
      //creamos un id aleatorio para poder asociarlo a la imagen
      const id = Math.random().toString(36).substring(2);
      const file=e.target.files[0];
      const filePath = 'pacientes/profile_'+id;
      const ref=this.fireStore.ref(filePath);
      const task=this.fireStore.upload(filePath,file)
      this.uploadPercent=task.percentageChanges();//recuperamos el porcentaje de carga del archivo
      task.snapshotChanges().pipe(finalize(()=>
       ref.getDownloadURL().subscribe(url=>{
        this.urlImage = url})      
      )
      ).subscribe();
    }
  onMouseMove(e) {
    var squares1 = document.getElementById("square1");
    var squares2 = document.getElementById("square2");
    var squares3 = document.getElementById("square3");
    var squares4 = document.getElementById("square4");
    var squares5 = document.getElementById("square5");
    var squares6 = document.getElementById("square6");
    var squares7 = document.getElementById("square7");
    var squares8 = document.getElementById("square8");

  }
}
