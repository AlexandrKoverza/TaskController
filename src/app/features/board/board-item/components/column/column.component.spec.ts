import { DragDropModule } from '@angular/cdk/drag-drop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { BoardsService } from 'src/app/services';
import { ColumnComponent } from './column.component';

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
  createTask: (id: number | string) => of(true),
  deleteTask: (taskId: number) => of(true),
  deleteComment: (commentId: number) => of(true),
};

describe('ColumnComponent', () => {
  let component: ColumnComponent;
  let fixture: ComponentFixture<ColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        DragDropModule,
      ],
      providers: [
        {
          provide: BoardsService,
          useValue: boardServiceMock,
        },
        FormBuilder,
      ],
      declarations: [ ColumnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
