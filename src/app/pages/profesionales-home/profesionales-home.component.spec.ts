import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalesHomeComponent } from './profesionales-home.component';

describe('ProfesionalesHomeComponent', () => {
  let component: ProfesionalesHomeComponent;
  let fixture: ComponentFixture<ProfesionalesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfesionalesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
