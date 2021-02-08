import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoPagosComponent } from './dialogo-pagos.component';

describe('DialogoPagosComponent', () => {
  let component: DialogoPagosComponent;
  let fixture: ComponentFixture<DialogoPagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoPagosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
