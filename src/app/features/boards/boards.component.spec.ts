import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { take } from 'rxjs';
import { BoardsService } from 'src/app/services';
import { BoardsServiceMock } from 'src/app/services/boards.service.mock';
import { SearchPipe } from 'src/app/shared/pipes/search.pipe';
import { SortPipePipe } from 'src/app/shared/pipes/sort-pipe.pipe';
import { TaskPipePipe } from 'src/app/shared/pipes/task-pipe.pipe';
import { boardsMock } from 'src/mocks/boards-mock';
import { BoardsComponent } from './boards.component';

describe('BoardsComponent', () => {
  let component: BoardsComponent;
  let fixture: ComponentFixture<BoardsComponent>;
  let router: Router;
  let service: BoardsService;
  // let httpClient: HttpClient;
  // let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardsComponent, TaskPipePipe, SortPipePipe, SearchPipe],
      imports: [FormsModule, HttpClientModule, RouterTestingModule],
      providers: [{ provide: BoardsService, useClass: BoardsServiceMock }],
    }).compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    fixture = TestBed.createComponent(BoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toBoard', () => {
    const id = 'd8568642-6dbd-4135-a1ba-0ebd9f1f9a54';
    component.toBoard('d8568642-6dbd-4135-a1ba-0ebd9f1f9a54');
    expect(router.navigate).toHaveBeenCalledWith(['/board', id]);
  });

  it('detailsBoard', () => {
    const id = 'd8568642-6dbd-4135-a1ba-0ebd9f1f9a54';
    component.detailsBoard('d8568642-6dbd-4135-a1ba-0ebd9f1f9a54');
    expect(router.navigate).toHaveBeenCalledWith(['/board', id, 'details']);
  });

  it('updateBoard', () => {
    const id = 'd8568642-6dbd-4135-a1ba-0ebd9f1f9a54';
    component.updateBoard('d8568642-6dbd-4135-a1ba-0ebd9f1f9a54');
    expect(router.navigate).toHaveBeenCalledWith(['/board', id, 'edit']);
  });

  xit('deleteBoard', () => {
    const id = 'd8568642-6dbd-4135-a1ba-0ebd9f1f9a54';

    expect(component.deleteBoard(id)).toBe(
      service
        .deleteBoard(id)
        .pipe(take(1))
        .subscribe({
          next: (boards: any) => expect(boards).toBeTruthy(),
          error: fail,
        })
    );

    // service.getBoards();

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
