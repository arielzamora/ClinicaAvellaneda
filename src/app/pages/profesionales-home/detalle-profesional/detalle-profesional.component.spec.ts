import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleProfesionalComponent } from './detalle-profesional.component';

describe('DetalleProfesionalComponent', () => {
  let component: DetalleProfesionalComponent;
  let fixture: ComponentFixture<DetalleProfesionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleProfesionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
