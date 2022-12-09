import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { BoardListItemComponent } from './board-list-item.component';
import { boardsMock } from 'src/mocks/boards-mock';

describe('BoardListItemComponent', () => {
  let component: BoardListItemComponent;
  let fixture: ComponentFixture<BoardListItemComponent>;
  let debug: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deleteBoard', () => {
    const spy = spyOn(component.delete, 'emit');
    const id = boardsMock[0].id;
    component.board.id = id;

    const link = debug.nativeElement.querySelector('button');
    link.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledOnceWith(id);
  });
});
