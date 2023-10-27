import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloclientComponent } from './helloclient.component';

describe('HelloclientComponent', () => {
  let component: HelloclientComponent;
  let fixture: ComponentFixture<HelloclientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HelloclientComponent]
    });
    fixture = TestBed.createComponent(HelloclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
