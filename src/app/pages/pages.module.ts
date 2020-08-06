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
import { CalendarioComponent } from './turnos-home/calendario/calendario.component'
import { ProfesionalesHomeComponent } from './profesionales-home/profesionales-home.component';
import { ListadoProfesionalesComponent } from './profesionales-home/listado-profesionales/listado-profesionales.component';
import { AltaProfesionalesComponent } from './profesionales-home/alta-profesionales/alta-profesionales.component';

import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { PacientesHomeComponent } from './pacientes-home/pacientes-home.component';
import { EspecialidadesHomeComponent } from './especialidades-home/especialidades-home.component';
import { ListadoEspecialidadesComponent } from './especialidades-home/listado-especialidades/listado-especialidades.component';
import{AltaEspecialidadesComponent}from './especialidades-home/alta-especialidades/alta-especialidades.component'
import { ListadoPacientesComponent } from './pacientes-home/listado-pacientes/listado-pacientes.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { UsuarioHomeComponent } from './usuario-home/usuario-home.component';
import { ListadoUsuariosComponent } from './usuario-home/listado-usuarios/listado-usuarios.component';
import { RegistroTurnoComponent } from './turnos-home/registro-turno/registro-turno.component';
import { DetalleProfesionalComponent } from './profesionales-home/detalle-profesional/detalle-profesional.component';
import { EditProfesionalComponent } from './profesionales-home/edit-profesional/edit-profesional.component';
import { MisTurnosComponent } from './turnos-home/mis-turnos/mis-turnos.component';
import {CsvComponent} from './../common/csv/csv.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TurnoObservacionComponent } from './turnos-home/turno-observacion/turno-observacion.component';
import { BusquedaTurnosComponent } from './turnos-home/busqueda-turnos/busqueda-turnos.component';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { filter } from 'rxjs/operators';
import { TurnoObservacionDetalleComponent } from './turnos-home/turno-observacion-detalle/turno-observacion-detalle.component';
import { TurnoEncuestaComponent } from './turnos-home/turno-encuesta/turno-encuesta.component';
import { InformesHomeComponent } from './informes-home/informes-home.component';
import { ChartModule } from 'angular2-highcharts';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
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
    ModalModule.forRoot(),
    ChartModule.forRoot(require('highcharts'),require('highcharts/modules/exporting')),
    NgxCaptchaModule
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
    CalendarioComponent,
    PacientesHomeComponent,
    EspecialidadesHomeComponent,
    ListadoEspecialidadesComponent,
    AltaEspecialidadesComponent,
    ListadoPacientesComponent,
    AltaProfesionalesComponent,
    UsuarioHomeComponent,
    ListadoUsuariosComponent,
    RegistroTurnoComponent,
    DetalleProfesionalComponent,
    EditProfesionalComponent,
    MisTurnosComponent,
    CsvComponent,
    TurnoObservacionComponent,
    BusquedaTurnosComponent,
    FilterPipe,
    TurnoObservacionDetalleComponent,
    TurnoEncuestaComponent,
    InformesHomeComponent
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
