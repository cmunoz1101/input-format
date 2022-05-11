import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcSummaryComponent } from './ec-summary.component';

describe('EcSummaryComponent', () => {
  let component: EcSummaryComponent;
  let fixture: ComponentFixture<EcSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
