import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosHomeComponent } from './turnos-home.component';

describe('TurnosHomeComponent', () => {
  let component: TurnosHomeComponent;
  let fixture: ComponentFixture<TurnosHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnosHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
