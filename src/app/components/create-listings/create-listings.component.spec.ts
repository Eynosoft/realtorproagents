import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateListingsComponent } from './create-listings.component';

describe('CreateListingsComponent', () => {
  let component: CreateListingsComponent;
  let fixture: ComponentFixture<CreateListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateListingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
