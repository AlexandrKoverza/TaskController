import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { BoardsService } from 'src/app/services';
import { SearchPipe } from 'src/app/shared/pipes/search.pipe';
import { SortPipePipe } from 'src/app/shared/pipes/sort-pipe.pipe';
import { BoardsComponent } from './boards.component';

xdescribe('BoardsComponent', () => {
  let component: BoardsComponent;
  let fixture: ComponentFixture<BoardsComponent>;
  let boardsService: BoardsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardsComponent, SortPipePipe, SearchPipe],
      imports: [FormsModule, HttpClientModule, RouterTestingModule],
      providers: [
        { 
          provide: BoardsService, 
          useValue: {
            deleteBoard: jasmine.createSpy().and.returnValue(of(null)),
          },
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardsComponent);
    boardsService = fixture.componentRef.injector.get(BoardsService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('deleteBoard', () => {
    const id = 'd8568642-6dbd-4135-a1ba-0ebd9f1f9a54';
    component.deleteBoard(id)
    expect(boardsService.deleteBoard).toHaveBeenCalled()
  });

  it('changeName', () => {
    const filterName = true;
    expect(component.changeName()).toEqual(filterName);
  });

  it('changeTasks', () => {
    const filterTasks = false;
    expect(component.changeTasks()).toEqual(!filterTasks);
  });
});
