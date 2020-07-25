import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoObservacionDetalleComponent } from './turno-observacion-detalle.component';

describe('TurnoObservacionDetalleComponent', () => {
  let component: TurnoObservacionDetalleComponent;
  let fixture: ComponentFixture<TurnoObservacionDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnoObservacionDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoObservacionDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
