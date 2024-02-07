import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeloginComponent } from './fakelogin.component';

describe('FakeloginComponent', () => {
  let component: FakeloginComponent;
  let fixture: ComponentFixture<FakeloginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FakeloginComponent]
    });
    fixture = TestBed.createComponent(FakeloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
