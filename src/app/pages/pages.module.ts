import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule ,ReactiveFormsModule} from "@angular/forms";
import { RouterModule } from "@angular/router";

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { TabsModule } from "ngx-bootstrap/tabs";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { AlertModule } from "ngx-bootstrap/alert";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ModalModule } from "ngx-bootstrap/modal";
import { PopoverModule } from "ngx-bootstrap/popover";

import { IndexComponent } from "./index/index.component";
import { ProfilepageComponent } from "./examples/profilepage/profilepage.component";
import { RegisterpageComponent } from "./examples/registerpage/registerpage.component";
import { LandingpageComponent } from "./examples/landingpage/landingpage.component";
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NavmenuComponent } from './navmenu/navmenu.component';


import { ValidarRolesDirective } from "./../directivas/validar-roles.directive";
import { TurnosHomeComponent } from './turnos-home/turnos-home.component';
import { AltaTurnoComponent } from './turnos-home/alta-turno/alta-turno.component';
import { ListadoTurnosComponent } from './turnos-home/listado-turnos/listado-turnos.component';
import { CalendarioComponent } from './turnos-home/calendario/calendario.component'
import { ProfesionalesHomeComponent } from './profesionales-home/profesionales-home.component';
import { ListadoProfesionalesComponent } from './profesionales-home/listado-profesionales/listado-profesionales.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { PacientesHomeComponent } from './pacientes-home/pacientes-home.component';
import { EspecialidadesHomeComponent } from './especialidades-home/especialidades-home.component';
import { ListadoEspecialidadesComponent } from './especialidades-home/listado-especialidades/listado-especialidades.component';
import{AltaEspecialidadesComponent}from './especialidades-home/alta-especialidades/alta-especialidades.component'
import { ListadoPacientesComponent } from './pacientes-home/listado-pacientes/listado-pacientes.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [
    IndexComponent,
    ProfilepageComponent,
    RegisterpageComponent,
    LandingpageComponent,
    HomeComponent,
    FooterComponent,
    NavmenuComponent,
    ProfesionalesHomeComponent,
    ListadoProfesionalesComponent,
    LoginComponent,
    RegistroComponent,
    ValidarRolesDirective,
    TurnosHomeComponent,
    AltaTurnoComponent,
    ListadoTurnosComponent,
    CalendarioComponent,
    PacientesHomeComponent,
    EspecialidadesHomeComponent,
    ListadoEspecialidadesComponent,
    AltaEspecialidadesComponent,
    ListadoPacientesComponent

  ],
  exports: [
    IndexComponent,
    ProfilepageComponent,
    RegisterpageComponent,
    LandingpageComponent,
    RegistroComponent,
    HomeComponent
  ],
  providers: []
})
export class PagesModule {}
