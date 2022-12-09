import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { BoardsService } from 'src/app/services';
import { BoardItemComponent } from './board-item.component';

const boardServiceMock = {
  board: [
    {
      id: 'd8568642-6dbd-4135-a1ba-0ebd9f1f9a54',
      name: 'First boarddfsdf',
      description: 'First board descriptionsdfsdf',
      creationDate: 23425325,
    },
  ],
  getBoard$: () => of(true),
  deleteBoard: (id: number | string) => of(true),
  createTask: (id: number | string) => of(true),
  deleteTask: (taskId: number) => of(true),
  deleteComment: (commentId: number) => of(true),
};

describe('BoardComponent', () => {
  let component: BoardItemComponent;
  let fixture: ComponentFixture<BoardItemComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        DragDropModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: BoardsService,
          useValue: boardServiceMock,
        },
        FormBuilder,
      ],
      declarations: [ BoardItemComponent ]
    })
    .compileComponents();

    router = TestBed.get(Router)
    fixture = TestBed.createComponent(BoardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deleteBoard', () => {
    component.deleteBoard('boardId');
    fixture.detectChanges();
    router.navigate(["/"])
  });

  it('addTask', () => {
    const spy = spyOn(component, 'showBoard');
    component.addTask('toDo', 'red', 'boardId', []);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('onDeleteTask', () => {
    const spy = spyOn(component, 'showBoard');
    component.onDeleteTask(1);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('onDeleteComment', () => {
    const spy = spyOn(component, 'showBoard');
    component.onDeleteComment(1);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });
});
