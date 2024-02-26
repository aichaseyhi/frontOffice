import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstagrammersComponent } from './instagrammers.component';

describe('InstagrammersComponent', () => {
  let component: InstagrammersComponent;
  let fixture: ComponentFixture<InstagrammersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstagrammersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstagrammersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
