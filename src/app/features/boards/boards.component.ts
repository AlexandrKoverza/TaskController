import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
    public modalService: ModalService,
    public boardsService: BoardsService,
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

  deleteBoard(id: string) {
    return this.boardsService.deleteBoard(id).subscribe(() => this.showBoards());
  }

  changeName() {
    return (this.filterName = !this.filterName);
  }

  changeTasks() {
    return (this.filterTasks = !this.filterTasks);
  }
}
