import { TestBed } from '@angular/core/testing';

import { PersistenceService } from './persistance.service';

describe('PersistanceService', () => {
  let service: PersistenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersistenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
