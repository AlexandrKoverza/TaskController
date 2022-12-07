import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ModalService } from './modal.service';

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('open', () => {
    expect(service.open).toBeTruthy();
  });

  it('close', () => {
    expect(service.close).toBeTruthy();
  });

});
