import { TestBed } from '@angular/core/testing';

import { OrganizationAuthGuard } from './organization-auth.guard';

describe('OrganizationAuthGuard', () => {
  let guard: OrganizationAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OrganizationAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
