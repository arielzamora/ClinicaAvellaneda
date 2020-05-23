import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaEspecialidadesComponent } from './alta-especialidades.component';

describe('AltaEspecialidadesComponent', () => {
  let component: AltaEspecialidadesComponent;
  let fixture: ComponentFixture<AltaEspecialidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaEspecialidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaEspecialidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
