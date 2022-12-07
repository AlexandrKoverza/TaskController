import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { BoardsService } from 'src/app/services';

import { EditComponent } from './edit.component';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let boardsService: BoardsService;

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
          useValue: {
            login: jasmine.createSpy().and.returnValue(of(null)),
          },
        },
      ],
      declarations: [ EditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditComponent);
    boardsService = fixture.componentRef.injector.get(BoardsService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('saveBoard', () => {
    component.saveBoard()
    expect(boardsService.updateBoard).toHaveBeenCalled()
  });
});
