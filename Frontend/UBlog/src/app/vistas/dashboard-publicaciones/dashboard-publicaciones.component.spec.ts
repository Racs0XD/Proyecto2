import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPublicacionesComponent } from './dashboard-publicaciones.component';

describe('DashboardPublicacionesComponent', () => {
  let component: DashboardPublicacionesComponent;
  let fixture: ComponentFixture<DashboardPublicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPublicacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPublicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
