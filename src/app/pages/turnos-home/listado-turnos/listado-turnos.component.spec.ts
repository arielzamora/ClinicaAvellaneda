import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTurnosComponent } from './listado-turnos.component';

describe('ListadoTurnosComponent', () => {
  let component: ListadoTurnosComponent;
  let fixture: ComponentFixture<ListadoTurnosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoTurnosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
