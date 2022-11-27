import { TestBed } from '@angular/core/testing';
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

  // it('open', () => {
  //   let a = true
  //   let fakeVisibleTrue = (a: any) => { return a }

  //   expect(fakeVisibleTrue).toBe(true);
  // });

  // it('close', () => {
  //   let a = false

  //   let fakeVisibleFalse = (a: any) => { return a }

  //   expect(fakeVisibleFalse).toBe(false);
  // });

});
