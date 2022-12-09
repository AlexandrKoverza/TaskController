import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { BoardsService } from 'src/app/services';
import { SearchPipe } from 'src/app/shared/pipes/search.pipe';
import { SortPipePipe } from 'src/app/shared/pipes/sort-pipe.pipe';
import { BoardsComponent } from './boards.component';

const boardServiceMock = {
  getBoards$: () => of(true),
  deleteBoard: (id: number) => of(true),
  updateBoards: () => {},
};

xdescribe('BoardsComponent', () => {
  let component: BoardsComponent;
  let fixture: ComponentFixture<BoardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardsComponent, SortPipePipe, SearchPipe],
      imports: [FormsModule, HttpClientModule, RouterTestingModule],
      providers: [
        {
          provide: BoardsService,
          useValue: boardServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deleteBoard', () => {
    component.deleteBoard("boardId");
  });

  it('changeName', () => {
    const filterName = true;
    expect(component.changeName()).toEqual(filterName);
  });
});
