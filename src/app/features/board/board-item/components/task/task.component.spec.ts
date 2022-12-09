import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TaskComponent } from './task.component';
import { BoardsService } from '../../../../../services';
import { BoardsServiceMock } from '../../../../../services/boards.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ITask } from '../../../../../models/task';
import { IComment } from '../../../../../models/comment';
import { DebugElement } from '@angular/core';
import { commentsMock } from 'src/mocks/comments-mock';

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
  updateBoardInfo: () => {},
  updateTask: (task: ITask) => of(true),
  createComment: (comment: IComment) => of(true),
};

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let debug: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule],
      declarations: [TaskComponent],
      providers: [
        {
          provide: BoardsService,
          useValue: boardServiceMock,
        },
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('addComment', function () {
    const spy = spyOn(component, 'showBoard');
    component.onAddComment(12344, 'boardId');
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('editCard', () => {
    expect(component.edit).toBeFalsy();
  });

  it('updateTaskDescription', () => {
    const spy = spyOn(component, 'showBoard');
    component.updateTaskDescription({
      id: 12313,
      description: 'string',
      color: 'string',
      type: 'string',
      creationDate: 23141,
      boardId: 'string'
    });

    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
});
