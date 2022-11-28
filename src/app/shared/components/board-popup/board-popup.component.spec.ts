import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardsService } from 'src/app/services';

import { BoardPopupComponent } from './board-popup.component';

describe('PopupComponent', () => {
  let component: BoardPopupComponent;
  let fixture: ComponentFixture<BoardPopupComponent>;
  let service: BoardsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
      declarations: [ BoardPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('submit', () => {

    const obj = {
      id: String(Date.now()),
      name: 'asdasd',
      description: 'asdasdad',
      creationDate: Date.now(),
      boardId: String(Date.now()),
      userId: 1
    }

    expect(component.submit).toBeTruthy();
    expect(service.createBoard).toBe(obj)

  });

  it('closePopup', () => {
    expect(component.closePopup).toBeTruthy();
  });
});
