import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderperlfilComponent } from './headerperlfil.component';

describe('HeaderperlfilComponent', () => {
  let component: HeaderperlfilComponent;
  let fixture: ComponentFixture<HeaderperlfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderperlfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderperlfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
