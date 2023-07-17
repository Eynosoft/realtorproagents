import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdxMembershipComponent } from './idx-membership.component';

describe('IdxMembershipComponent', () => {
  let component: IdxMembershipComponent;
  let fixture: ComponentFixture<IdxMembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [IdxMembershipComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdxMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
