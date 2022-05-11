import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcFieldFormatComponent } from './ec-field-format.component';

describe('EcFieldFormatComponent', () => {
  let component: EcFieldFormatComponent;
  let fixture: ComponentFixture<EcFieldFormatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcFieldFormatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcFieldFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
