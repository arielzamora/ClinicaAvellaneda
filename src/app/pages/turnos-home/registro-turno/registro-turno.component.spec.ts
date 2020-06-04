import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroTurnoComponent } from './registro-turno.component';

describe('RegistroTurnoComponent', () => {
  let component: RegistroTurnoComponent;
  let fixture: ComponentFixture<RegistroTurnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroTurnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
