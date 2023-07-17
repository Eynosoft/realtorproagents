import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactTaskSidebarComponent } from './contact-task-sidebar.component';

describe('ContactTaskSidebarComponent', () => {
  let component: ContactTaskSidebarComponent;
  let fixture: ComponentFixture<ContactTaskSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ContactTaskSidebarComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactTaskSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
