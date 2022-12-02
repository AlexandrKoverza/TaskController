import { Observable, of, take } from 'rxjs';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Board } from '../../models';
import { BoardsService, ModalService } from '../../services';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit{
  searchText: string = '';
  boards: Board[] = [];
  filterName: boolean = false;
  filterTasks: boolean = false;

  constructor(
    private router: Router,
    public modalService: ModalService,
    public boardsService: BoardsService,
    private changeDetectionRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.update()
  }

  update() {
    this.boardsService.getBoards().subscribe((boards) => {
      this.boards = boards
      this.changeDetectionRef.markForCheck()
    })
  }

  toBoard(id: string) {
    this.router.navigate(['/board', id]);
  }

  detailsBoard(id: string) {
    this.router.navigate(['/board', id, 'details']);
  }

  updateBoard(id: string) {
    this.router.navigate(['/board', id, 'edit']);
  }

  deleteBoard(id: string) {
    return this.boardsService
      .deleteBoard(id)
      .subscribe(() => {
        this.update()
      });
  }

  changeName() {
    return (this.filterName = !this.filterName);
  }

  changeTasks() {
    return (this.filterTasks = !this.filterTasks);
  }
}
