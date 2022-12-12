import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchPipe } from 'src/app/shared/pipes/search.pipe';
import { SortPipePipe } from 'src/app/shared/pipes/sort-pipe.pipe';
import { BoardsComponent } from './boards.component';

describe('BoardsComponent', () => {
  let component: BoardsComponent;
  let fixture: ComponentFixture<BoardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardsComponent, SortPipePipe, SearchPipe],
      imports: [FormsModule, HttpClientModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deleteBoard', () => {
    expect(component.deleteBoard).toBeTruthy()
  });

  it('changeName', () => {
    const filterName = true;
    expect(component.changeName()).toEqual(filterName);
  });
});
