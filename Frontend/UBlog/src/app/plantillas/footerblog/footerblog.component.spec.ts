import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterblogComponent } from './footerblog.component';

describe('FooterblogComponent', () => {
  let component: FooterblogComponent;
  let fixture: ComponentFixture<FooterblogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterblogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
