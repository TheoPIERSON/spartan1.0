import { TestBed } from '@angular/core/testing';

import { PrestationIdService } from './prestation-id.service';

describe('PrestationIdService', () => {
  let service: PrestationIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrestationIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
