import { TestBed } from '@angular/core/testing';

import { ComandasService } from './services/comandas.service';

describe('ComandasService', () => {
  let service: ComandasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComandasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
