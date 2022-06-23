import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeLoaderComponent } from './three-loader.component';

describe('ThreeLoaderComponent', () => {
  let component: ThreeLoaderComponent;
  let fixture: ComponentFixture<ThreeLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
