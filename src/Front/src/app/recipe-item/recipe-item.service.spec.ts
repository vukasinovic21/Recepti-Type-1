import { TestBed } from '@angular/core/testing';

import { RecipeItemService } from './recipe-item.service';

describe('RecipeItemService', () => {
  let service: RecipeItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
