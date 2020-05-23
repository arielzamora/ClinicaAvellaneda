import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaPacientesComponent } from './alta-pacientes.component';

describe('AltaPacientesComponent', () => {
  let component: AltaPacientesComponent;
  let fixture: ComponentFixture<AltaPacientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaPacientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
