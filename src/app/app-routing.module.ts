import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule }from '@angular/platform-browser/animations';
import { Routes, RouterModule } from "@angular/router";

import { IndexComponent } from "./pages/index/index.component";
import { ProfilepageComponent } from "./pages/examples/profilepage/profilepage.component";
import { RegisterpageComponent } from "./pages/examples/registerpage/registerpage.component";
import { LandingpageComponent } from "./pages/examples/landingpage/landingpage.component";
//mios
import{HomeComponent} from "./pages/home/home.component";
import{RegistroComponent} from "./pages/registro/registro.component";
import{LoginComponent}from "./pages/login/login.component";
import { AuthGuard } from "./././guards/auth.guard";
import { NologinGuard } from "././guards/nologin.guard";
import{PacientesHomeComponent} from "./pages/pacientes-home/pacientes-home.component";
import{EspecialidadesHomeComponent} from "./pages/especialidades-home/especialidades-home.component";
import{ProfesionalesHomeComponent} from "./pages/profesionales-home/profesionales-home.component";
import{TurnosHomeComponent} from "./pages/turnos-home/turnos-home.component";
import{TurnoObservacionComponent} from "./pages/turnos-home/turno-observacion/turno-observacion.component";
import{BusquedaTurnosComponent} from "./pages/turnos-home/busqueda-turnos/busqueda-turnos.component";
import{UsuarioHomeComponent}from "./pages/usuario-home/usuario-home.component";
import{RegistroTurnoComponent}from "./pages/turnos-home/registro-turno/registro-turno.component";
import{MisTurnosComponent}from "./pages/turnos-home/mis-turnos/mis-turnos.component";
import{AltaProfesionalesComponent} from "./pages/profesionales-home/alta-profesionales/alta-profesionales.component";
import{TurnoObservacionDetalleComponent} from "./pages/turnos-home/turno-observacion-detalle/turno-observacion-detalle.component";
import{TurnoEncuestaComponent} from "./pages/turnos-home/turno-encuesta/turno-encuesta.component";
import{InformesHomeComponent} from "./pages/informes-home/informes-home.component";


const routes: Routes = [
  { 
    path: "login", component: LoginComponent ,canActivate:[NologinGuard]
  },
  { path: "", redirectTo: "/bienvenida", pathMatch: "full" },
  { path: "bienvenida", component: HomeComponent ,canActivate: [AuthGuard] ,data: {animation: 'PrincipalPage'}},
  { path: "pacientes", component: PacientesHomeComponent ,canActivate:[AuthGuard] ,data: {animation: 'LoginPage'}},
  { path: "especialidades", component: EspecialidadesHomeComponent ,canActivate:[AuthGuard] ,data: {animation: 'LoginPage'}},
  { path: "profesionales", component: ProfesionalesHomeComponent ,canActivate:[AuthGuard] ,data: {animation: 'LoginPage'}},
  { path: "turnos", component: TurnosHomeComponent ,canActivate:[AuthGuard] ,data: {animation: 'LoginPage'}},
  { path: "turnoObservacion", component: TurnoObservacionComponent ,canActivate:[AuthGuard] ,data: {animation: 'LoginPage'}},
  { path: "busquedaTurnos", component: BusquedaTurnosComponent ,canActivate:[AuthGuard] ,data: {animation: 'LoginPage'}},
  { path: "usuarios", component: UsuarioHomeComponent ,canActivate:[AuthGuard]},
  { path: "registroTurno", component: RegistroTurnoComponent ,canActivate:[AuthGuard]},
  { path: "misTurnos", component: MisTurnosComponent ,canActivate:[AuthGuard] ,data: {animation: 'LoginPage'}},
  { path: "turnoObservacionDetalle", component: TurnoObservacionDetalleComponent ,canActivate:[AuthGuard] ,data: {animation: 'LoginPage'}},
  { path: "turnosEncuesta", component: TurnoEncuestaComponent ,canActivate:[AuthGuard] ,data: {animation: 'LoginPage'}},
  { path: "informes", component: InformesHomeComponent ,canActivate:[AuthGuard] ,data: {animation: 'LoginPage'}},
  { path: "profile", component: ProfilepageComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] } 
  },
  { path: "register", component: RegisterpageComponent, 
    canActivate: [AuthGuard],
    data: { roles: ['admin'] } 
  },
  { path: "landing", component: LandingpageComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] } 
  },
  { path: "home", component: IndexComponent, 
    canActivate: [AuthGuard],
    data: { roles: ['admin'] } 
  },
  { path: "registro", component: RegistroComponent },
  { path: "registroProfesional", component: AltaProfesionalesComponent },

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: []
})
export class AppRoutingModule {}
