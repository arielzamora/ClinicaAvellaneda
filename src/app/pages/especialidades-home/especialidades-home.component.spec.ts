import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadesHomeComponent } from './especialidades-home.component';

describe('EspecialidadesHomeComponent', () => {
  let component: EspecialidadesHomeComponent;
  let fixture: ComponentFixture<EspecialidadesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspecialidadesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialidadesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
