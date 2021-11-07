import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPublicacionesvComponent } from './dashboard-publicacionesv.component';

describe('DashboardPublicacionesvComponent', () => {
  let component: DashboardPublicacionesvComponent;
  let fixture: ComponentFixture<DashboardPublicacionesvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPublicacionesvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPublicacionesvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
