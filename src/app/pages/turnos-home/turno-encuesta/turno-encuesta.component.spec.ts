import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoEncuestaComponent } from './turno-encuesta.component';

describe('TurnoEncuestaComponent', () => {
  let component: TurnoEncuestaComponent;
  let fixture: ComponentFixture<TurnoEncuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnoEncuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
