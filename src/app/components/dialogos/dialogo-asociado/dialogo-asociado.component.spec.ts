import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoAsociadoComponent } from './dialogo-asociado.component';

describe('DialogoAsociadoComponent', () => {
  let component: DialogoAsociadoComponent;
  let fixture: ComponentFixture<DialogoAsociadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoAsociadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoAsociadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
