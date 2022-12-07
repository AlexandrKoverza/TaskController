import {
  HttpClient,
  HttpClientModule,
  HttpResponse,
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BoardsService } from './boards.service';
import { boardsMock } from 'src/mocks/boards-mock';
import { tasksMock } from 'src/mocks/tasks-mock';
import { commentsMock } from 'src/mocks/comments-mock';


describe('BoardsService', () => {
  let service: BoardsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [HttpClient, BoardsService],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BoardsService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //boards
  describe('getBoard', () => {
    it('should get board', () => {
      const id = 'd8568642-6dbd-4135-a1ba-0ebd9f1f9a54';
      const url = `http://localhost:3000/boards/${id}?_embed=tasks&_embed=comments`;

      service.getBoard(id).subscribe({
        next: (board) =>
          expect(board)
            .withContext('should return the board')
            .toEqual(boardsMock[0]),
        error: fail,
      });

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('GET');

      req.flush(boardsMock[0]);
    });

    it('should get board with requested board id', () => {
      const id = 'd8568642-6dbd-4135-a1ba-0ebd9f1f9a55';
      const url = `http://localhost:3000/boards/${id}?_embed=tasks&_embed=comments`;

      service.getBoard(id).subscribe({
        next: (board) =>
          expect(board.id).withContext('should return the board').toEqual(id),
        error: fail,
      });

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('GET');
    });
  });

  describe('getBoards', () => {
    it('should return boards', () => {
      const url = 'http://localhost:3000/boards';
      service.getBoards().subscribe({
        next: (boards: any) => expect(boards).toEqual(boardsMock),
        error: fail,
      });

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('GET');

      req.flush(boardsMock);
    });

    it('should be returning 2 boards', () => {
      const url = 'http://localhost:3000/boards';

      service
        .getBoards()
        .subscribe((boards: any) =>
          expect(boards.length).withContext('should return empty array').toBe(2)
        );

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('GET');

      req.flush(boardsMock);
    });
  });

  describe('createBoard', () => {
    beforeEach(() => {
      service = TestBed.inject(BoardsService);
    });

    it('should create board', () => {
      const url = `http://localhost:3000/boards`;

      const board = {
        id: 'd8568642-6dbd-4135-a1ba-0ebd9f1f9a55',
        userId: 1,
        name: 'second board',
        description: 'second board description',
        creationDate: 1666721401856,
      };

      service.createBoard(board).subscribe({
        next: (data) => expect(data).toEqual(boardsMock),
        error: fail,
      });

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(board);
    });
  });

  describe('updateBoard', () => {
    beforeEach(() => {
      service = TestBed.inject(BoardsService);
    });

    it('should update board', () => {
      const id = 'd8568642-6dbd-4135-a1ba-0ebd9f1f9a54';
      const url = `http://localhost:3000/boards/${id}`;

      const board = {
        id: 'd8568642-6dbd-4135-a1ba-0ebd9f1f9a54',
        name: 'First board',
        description: 'First board description',
        creationDate: 1666721401855,
      };

      service.updateBoard(board).subscribe({
        next: (data) => expect(data).toBeTruthy(),
        error: fail,
      });

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('PATCH');
      expect(req.request.body).toEqual(board);

      const response = new HttpResponse({
        status: 200,
        statusText: 'OK',
        body: { success: true },
      });
      req.event(response);
    });
  });

  describe('deleteBoard', () => {
    it('should delete board', () => {
      const id = 'd8568642-6dbd-4135-a1ba-0ebd9f1f9a54';
      const url = `http://localhost:3000/boards/${id}`;

      service.deleteBoard(id).subscribe({
        next: (board) => expect(board).toBeTruthy(),
        error: fail,
      });

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('DELETE');

      req.flush(boardsMock);
    });
  });

  //tasks
  describe('createTask', () => {
    beforeEach(() => {
      service = TestBed.inject(BoardsService);
    });

    it('should create task', () => {
      const url = `http://localhost:3000/tasks/`;

      const task =     {
        id: 1669634064189,
        description: "third",
        color: "#FDAA3D",
        type: "done",
        creationDate: 1669634064187,
        boardId: "d8568642-6dbd-4135-a1ba-0ebd9f1f9a54"
    };

      service.createTask(task).subscribe({
        next: (data) => expect(data).toEqual(tasksMock),
        error: fail,
      });

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(task);
    });
  });

  describe('updateTask', () => {
    beforeEach(() => {
      service = TestBed.inject(BoardsService);
    });

    it('should update task', () => {
      const id = '1669634064189';
      const url = `http://localhost:3000/tasks/${id}`;

      const task =    {
        id: 1669634064189,
        description: "third",
        color: "#FDAA3D",
        type: "done",
        creationDate: 1669634064187,
        boardId: "d8568642-6dbd-4135-a1ba-0ebd9f1f9a54"
    };

      service.updateTask(task).subscribe({
        next: (data) => expect(data).toEqual(tasksMock),
        error: fail,
      });

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('PATCH');
      expect(req.request.body).toEqual(task);
    });
  });

  describe('deleteTask', () => {
    it('should delete task', () => {
      const id = 1669634064187;
      const url = `http://localhost:3000/tasks/${id}`;

      service.deleteTask(id).subscribe({
        next: (board) => expect(board).toBeTruthy(),
        error: fail,
      });

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('DELETE');

      req.flush(tasksMock);
    });
  });

  //comments
  describe('createComment', () => {
    beforeEach(() => {
      service = TestBed.inject(BoardsService);
    });

    it('should create comment', () => {
      const url = `http://localhost:3000/comments/`;

      const comment = {
        id: 1,
        text: 'comment 1',
        boardId: "d8568642-6dbd-4135-a1ba-0ebd9f1f9a54",
        taskId: 1
    }

      service.createComment(comment).subscribe({
        next: (data) => expect(data).toEqual(commentsMock),
        error: fail,
      });

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(comment);
    });
  });

  describe('deleteComment', () => {
    it('should delete comment', () => {
      const id = 1;
      const url = `http://localhost:3000/comments/${1}`;

      service.deleteComment(id).subscribe({
        next: (data) => expect(data).toBeTruthy(),
        error: fail,
      });

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('DELETE');

      req.flush(commentsMock);
    });
  });

});
