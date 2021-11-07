import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubliusuarioComponent } from './publiusuario.component';

describe('PubliusuarioComponent', () => {
  let component: PubliusuarioComponent;
  let fixture: ComponentFixture<PubliusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PubliusuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PubliusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
