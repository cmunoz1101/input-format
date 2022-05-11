import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldsFormatDialogComponent } from './fields-format-dialog.component';

describe('FieldsFormatDialogComponent', () => {
  let component: FieldsFormatDialogComponent;
  let fixture: ComponentFixture<FieldsFormatDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldsFormatDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldsFormatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
