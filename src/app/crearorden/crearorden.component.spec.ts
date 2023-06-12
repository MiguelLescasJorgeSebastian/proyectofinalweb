import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearordenComponent } from './crearorden.component';

describe('CrearordenComponent', () => {
  let component: CrearordenComponent;
  let fixture: ComponentFixture<CrearordenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearordenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearordenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
