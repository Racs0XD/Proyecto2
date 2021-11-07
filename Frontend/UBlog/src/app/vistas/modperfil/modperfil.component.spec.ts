import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModperfilComponent } from './modperfil.component';

describe('ModperfilComponent', () => {
  let component: ModperfilComponent;
  let fixture: ComponentFixture<ModperfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModperfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModperfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
