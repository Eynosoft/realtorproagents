import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateManagingEmailComponent } from './create-managing-email.component';

describe('CreateManagingEmailComponent', () => {
  let component: CreateManagingEmailComponent;
  let fixture: ComponentFixture<CreateManagingEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [CreateManagingEmailComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateManagingEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
