import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdxPaymentSuccessComponent } from './idx-payment-success.component';

describe('IdxPaymentSuccessComponent', () => {
  let component: IdxPaymentSuccessComponent;
  let fixture: ComponentFixture<IdxPaymentSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdxPaymentSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdxPaymentSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
