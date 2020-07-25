import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaTurnosComponent } from './busqueda-turnos.component';

describe('BusquedaTurnosComponent', () => {
  let component: BusquedaTurnosComponent;
  let fixture: ComponentFixture<BusquedaTurnosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaTurnosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
