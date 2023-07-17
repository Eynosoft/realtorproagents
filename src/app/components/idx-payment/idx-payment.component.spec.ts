import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdxPaymentComponent } from './idx-payment.component';

describe('IdxPaymentComponent', () => {
  let component: IdxPaymentComponent;
  let fixture: ComponentFixture<IdxPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [IdxPaymentComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdxPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
