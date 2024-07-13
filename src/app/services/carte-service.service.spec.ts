import { TestBed } from '@angular/core/testing';

import { CarteServiceService } from './carte-service.service';

describe('CarteServiceService', () => {
  let service: CarteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
