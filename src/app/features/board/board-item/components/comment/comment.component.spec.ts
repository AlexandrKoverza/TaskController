import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { commentsMock } from 'src/mocks/comments-mock';
import { CommentComponent } from './comment.component';

xdescribe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  let debug: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onCommentEmit', () => {
    const spy = spyOn(component.emitComment, 'emit');
    const text = 'comment 1'

    const link = debug.nativeElement.querySelector('.comment-task__img').querySelector('img');
    link.click();
    fixture.detectChanges();

    expect(spy(text)).toHaveBeenCalledOnceWith(commentsMock[0].text);
  });
});
