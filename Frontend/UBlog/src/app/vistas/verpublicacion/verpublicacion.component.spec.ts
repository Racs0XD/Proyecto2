import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerpublicacionComponent } from './verpublicacion.component';

describe('VerpublicacionComponent', () => {
  let component: VerpublicacionComponent;
  let fixture: ComponentFixture<VerpublicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerpublicacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerpublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
