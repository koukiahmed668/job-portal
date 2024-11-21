import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostANewJobComponent } from './post-a-new-job.component';

describe('PostANewJobComponent', () => {
  let component: PostANewJobComponent;
  let fixture: ComponentFixture<PostANewJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostANewJobComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostANewJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
