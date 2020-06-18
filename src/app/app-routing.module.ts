import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
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
import{UsuarioHomeComponent}from "./pages/usuario-home/usuario-home.component";
import{RegistroTurnoComponent}from "./pages/turnos-home/registro-turno/registro-turno.component";
import{MisTurnosComponent}from "./pages/turnos-home/mis-turnos/mis-turnos.component";

const routes: Routes = [
  { 
    path: "login", component: LoginComponent ,canActivate:[NologinGuard]
  },
  { path: "", redirectTo: "/bienvenida", pathMatch: "full" },
  { path: "bienvenida", component: HomeComponent ,canActivate: [AuthGuard]},
  { path: "pacientes", component: PacientesHomeComponent ,canActivate:[AuthGuard]},
  { path: "especialidades", component: EspecialidadesHomeComponent ,canActivate:[AuthGuard]},
  { path: "profesionales", component: ProfesionalesHomeComponent ,canActivate:[AuthGuard]},
  { path: "turnos", component: TurnosHomeComponent ,canActivate:[AuthGuard]},
  { path: "usuarios", component: UsuarioHomeComponent ,canActivate:[AuthGuard]},
  { path: "registroTurno", component: RegistroTurnoComponent ,canActivate:[AuthGuard]},
  { path: "misTurnos", component: MisTurnosComponent ,canActivate:[AuthGuard]},
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

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: []
})
export class AppRoutingModule {}
