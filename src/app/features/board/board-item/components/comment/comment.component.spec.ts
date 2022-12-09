import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { commentsMock } from 'src/mocks/comments-mock';
import { CommentComponent } from './comment.component';

describe('CommentComponent', () => {
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
    const comment = commentsMock[0];
    component.comment = comment;

    const link = debug.nativeElement.querySelector('img');
    link.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledOnceWith(comment);
  });
});
