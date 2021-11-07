import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPublicacionComponent } from './agregar-publicacion.component';

describe('AgregarPublicacionComponent', () => {
  let component: AgregarPublicacionComponent;
  let fixture: ComponentFixture<AgregarPublicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarPublicacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
