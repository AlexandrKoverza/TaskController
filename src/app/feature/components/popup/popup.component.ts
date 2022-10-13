import { BoardsService } from './../../../services/boards.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import {v4 as uuid } from 'uuid';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {
  @Input() name: string | undefined;
  @Input() description: string | undefined;

  form = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    description: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(100),
    ]),
  });

  constructor(public modalService: ModalService, public boardsService: BoardsService) {}

  ngOnInit(): void {}

  get names() {
    return this.form.controls.name as FormControl;
  }

  get descriptions() {
    return this.form.controls.description as FormControl;
  }

  submit() {
    const board = {
      id: uuid(),
      name: this.form.value.name as string,
      description: this.form.value.description as string,
      tasks: 0,
      creationDate: Date.now(),
    };
    this.boardsService.boards.push(board)
    this.modalService.close()
    console.log(this.boardsService.boards);
    
  }
}
