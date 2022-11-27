import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { BoardListItemComponent } from './board-list-item.component';
import { boardsMock } from 'src/mocks/boards-mock';

xdescribe('BoardListItemComponent', () => {
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

  it('toBoard', () => {
    const spy = spyOn(component.showBoard, 'emit');

    const link = debug.nativeElement.querySelector('.goBtn').querySelector('button');
    link.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledOnceWith(boardsMock[0].id);
  });

  it('detailsBoard', () => {
    const spy = spyOn(component.details, 'emit');

    const link = debug.nativeElement.querySelector('.detailsBtn').querySelector('button');
    link.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledOnceWith(boardsMock[0].id);
  });

  it('updateBoard', () => {
    const spy = spyOn(component.update, 'emit');

    const link = debug.nativeElement.querySelector('.updateBtn').querySelector('button');
    link.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledOnceWith(boardsMock[0].id);
  });

  it('deleteBoard', () => {
    const spy = spyOn(component.delete, 'emit');

    const link = debug.nativeElement.querySelector('.deleteBtn').querySelector('button');
    link.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledOnceWith(boardsMock[0].id);
  });
});
