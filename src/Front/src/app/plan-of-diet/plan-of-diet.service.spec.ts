import { TestBed } from '@angular/core/testing';

import { PlanOfDietService } from './plan-of-diet.service';

describe('PlanOfDietService', () => {
  let service: PlanOfDietService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanOfDietService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
