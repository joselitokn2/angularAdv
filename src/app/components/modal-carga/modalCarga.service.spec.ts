/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ModalCargaService } from './modalCarga.service';

describe('Service: ModalCarga', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalCargaService]
    });
  });

  it('should ...', inject([ModalCargaService], (service: ModalCargaService) => {
    expect(service).toBeTruthy();
  }));
});
