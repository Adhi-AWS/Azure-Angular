import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudCredentialsComponent } from './cloud-credentials.component';

describe('CloudCredentialsComponent', () => {
  let component: CloudCredentialsComponent;
  let fixture: ComponentFixture<CloudCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CloudCredentialsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
