import { TestBed } from '@angular/core/testing';

import { IvrService } from './ivr.service';

describe('IvrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IvrService = TestBed.get(IvrService);
    expect(service).toBeTruthy();
  });
});
