import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { BoardsService } from 'src/app/services';
import { EditComponent } from './edit.component';

const boardServiceMock = {
  board: [
    {
      id: 'd8568642-6dbd-4135-a1ba-0ebd9f1f9a54',
      name: 'First boarddfsdf',
      description: 'First board descriptionsdfsdf',
      creationDate: 23425325,
    },
  ],
  getBoards: () => of(true),
  updateBoard: ({}) => of(true),
};

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
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
      declarations: [ EditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('saveBoard', () => {
    expect(component.saveBoard).toBeTruthy()
    fixture.detectChanges();
  });
});
