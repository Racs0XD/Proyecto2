import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportespComponent } from './reportesp.component';

describe('ReportespComponent', () => {
  let component: ReportespComponent;
  let fixture: ComponentFixture<ReportespComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportespComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportespComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
