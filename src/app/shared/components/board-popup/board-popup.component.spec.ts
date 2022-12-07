import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { BoardsService, ModalService } from 'src/app/services';
import { boardsMock } from 'src/mocks/boards-mock';

import { BoardPopupComponent } from './board-popup.component';

describe('PopupComponent', () => {
  let component: BoardPopupComponent;
  let fixture: ComponentFixture<BoardPopupComponent>;
  let boardsService: BoardsService;
  let modalService: ModalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
      providers: [
        {
          provide: ModalService,
          useValue: {
            close: jasmine.createSpy().and.returnValue(of(null)),
          },
        },
      ],
      declarations: [ BoardPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardPopupComponent);
    modalService = fixture.componentRef.injector.get(ModalService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('submit', () => {
    const obj = {
      id: 'd8568642-6dbd-4135-a1ba-0ebd9f1f9a54',
      userId: 1,
      name: 'First board',
      description: 'First board description',
      creationDate: 1666721401855,
    }

    component.submit()
    boardsService.createBoard(obj).subscribe({
      next: (boards) =>
        expect(boards).toEqual(boardsMock),
      error: fail,
    });

  });

  it('closePopup', () => {
    component.closePopup()
    expect(modalService.close).toHaveBeenCalled()
  });
});
