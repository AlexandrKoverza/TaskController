import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { BoardsService, ModalService } from 'src/app/services';
import { BoardPopupComponent } from './board-popup.component';

const boardServiceMock = {
  createBoard: (board: any) => of(true),
  updateBoards: () => {},
};

describe('PopupComponent', () => {
  let component: BoardPopupComponent;
  let fixture: ComponentFixture<BoardPopupComponent>;
  let modalService: ModalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: ModalService,
          useValue: {
            close: jasmine.createSpy().and.returnValue(of(null)),
          },
        },
        {
          provide: BoardsService,
          useValue: boardServiceMock,
        },
        FormBuilder,
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

  it('submit', () => {
    component.submit();
    expect(modalService.close).toHaveBeenCalled()
  });

  it('closePopup', () => {
    component.closePopup()
    expect(modalService.close).toHaveBeenCalled()
  });
});
