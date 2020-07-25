import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoObservacionComponent } from './turno-observacion.component';

describe('TurnoObservacionComponent', () => {
  let component: TurnoObservacionComponent;
  let fixture: ComponentFixture<TurnoObservacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnoObservacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoObservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
