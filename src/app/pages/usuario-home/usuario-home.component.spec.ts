import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioHomeComponent } from './usuario-home.component';

describe('UsuarioHomeComponent', () => {
  let component: UsuarioHomeComponent;
  let fixture: ComponentFixture<UsuarioHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
