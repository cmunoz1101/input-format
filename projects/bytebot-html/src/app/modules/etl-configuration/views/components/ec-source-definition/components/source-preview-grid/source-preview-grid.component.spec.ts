import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourcePreviewGridComponent } from './source-preview-grid.component';

describe('SourcePreviewGridComponent', () => {
  let component: SourcePreviewGridComponent;
  let fixture: ComponentFixture<SourcePreviewGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourcePreviewGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourcePreviewGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
