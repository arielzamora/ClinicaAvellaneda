import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesHomeComponent } from './pacientes-home.component';

describe('PacientesHomeComponent', () => {
  let component: PacientesHomeComponent;
  let fixture: ComponentFixture<PacientesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacientesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacientesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
