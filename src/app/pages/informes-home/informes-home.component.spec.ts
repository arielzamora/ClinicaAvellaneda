import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesHomeComponent } from './informes-home.component';

describe('InformesHomeComponent', () => {
  let component: InformesHomeComponent;
  let fixture: ComponentFixture<InformesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
