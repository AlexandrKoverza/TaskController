import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Board } from 'src/app/models';
import { BoardsService, ModalService } from '../../../services';

@Component({
  selector: 'app-board-popup',
  templateUrl: './board-popup.component.html',
  styleUrls: ['./board-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardPopupComponent implements OnInit{
  boards: Board[] = [];
  form = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  })

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private modalService: ModalService,
    private boardsService: BoardsService,
    private changeDetectionRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.showBoards()
  }

  showBoards() {
    this.boardsService.getBoards().subscribe((boards) => {
      this.boards = boards
      this.changeDetectionRef.markForCheck()
    })
  }

  submit() {
    this.boardsService
      .createBoard({
        id: String(Date.now()),
        name: this.form.value.name as string,
        description: this.form.value.description as string,
        creationDate: Date.now(),
      }).subscribe(() => {
        this.modalService.close();
        this.router.navigate(['/']);
        this.showBoards()
      });
  }

  closePopup() {
    this.modalService.close();
  }

}
