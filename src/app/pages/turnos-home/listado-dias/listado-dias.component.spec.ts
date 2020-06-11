import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDiasComponent } from './listado-dias.component';

describe('ListadoDiasComponent', () => {
  let component: ListadoDiasComponent;
  let fixture: ComponentFixture<ListadoDiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoDiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoDiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
