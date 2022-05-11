import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcSourceTestComponent } from './ec-source-test.component';

describe('EcSourceTestComponent', () => {
  let component: EcSourceTestComponent;
  let fixture: ComponentFixture<EcSourceTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcSourceTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcSourceTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
