import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Board, BoardBase } from "../../models";
import { BoardsService, ModalService } from '../../services';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit{
  searchText: string = '';
  boards: BoardBase[] = [];
  filterName: boolean = false;
  filterTasks: boolean = false;

  constructor(
    public modalService: ModalService,
    public boardsService: BoardsService,
    private changeDetectionRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // this.showBoards()
    this.boardsService.getBoards$().subscribe(boards => {
      this.boards = boards;
      this.changeDetectionRef.markForCheck()
    });

    this.boardsService.updateBoards();
  }

  // showBoards() {
  //   this.boardsService.getBoards().subscribe((boards) => {
  //     this.boards = boards
  //   })
  // }

  deleteBoard(id: string) {
    return this.boardsService.deleteBoard(id).subscribe(() => {
      this.boardsService.updateBoards();
    });
  }

  changeName() {
    return (this.filterName = !this.filterName);
  }

  // changeTasks() {
  //   return (this.filterTasks = !this.filterTasks);
  // }
}
