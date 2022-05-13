import { TestBed } from '@angular/core/testing';

import { FdgService } from './fdg.service';

describe('FdgService', () => {
  let service: FdgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
