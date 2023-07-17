import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaTagsComponent } from './meta-tags.component';

describe('MetaTagsComponent', () => {
  let component: MetaTagsComponent;
  let fixture: ComponentFixture<MetaTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [MetaTagsComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetaTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
