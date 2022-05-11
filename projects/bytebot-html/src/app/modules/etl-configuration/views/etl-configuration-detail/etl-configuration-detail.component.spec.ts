import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtlConfigurationDetailComponent } from './etl-configuration-detail.component';

describe('EtlConfigurationDetailComponent', () => {
  let component: EtlConfigurationDetailComponent;
  let fixture: ComponentFixture<EtlConfigurationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtlConfigurationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtlConfigurationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
