import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtlConfigurationGridComponent } from './etl-configuration-grid.component';

describe('EtlConfigurationGridComponent', () => {
  let component: EtlConfigurationGridComponent;
  let fixture: ComponentFixture<EtlConfigurationGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtlConfigurationGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtlConfigurationGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
