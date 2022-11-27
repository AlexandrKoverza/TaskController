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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify();
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

  describe('getBoard', () => {

    it('should get board', () => {
      const id = 'd8568642-6dbd-4135-a1ba-0ebd9f1f9a54';
      const url = `http://localhost:3000/boards/${id}`;

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
      const id = 'd8568642-6dbd-4135-a1ba-0ebd9f1f9a54';
      const url = `http://localhost:3000/boards/${id}`;

      service.getBoard(id).subscribe({
        next: (board) =>
          expect(board.id).withContext('should return the board').toEqual(id),
        error: fail,
      });

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('GET');

      req.flush(boardsMock[0]);
    });
  });

  // describe('deleteBoard', () => {

  //   const id = 'd8568642-6dbd-4135-a1ba-0ebd9f1f9a54';
  //   const url = `http://localhost:3000/boards/${id}`;
    

  //   it('deleteBoard', () => {

  //     service.deleteBoard(id).subscribe({
  //       next: board => expect(board.id)
  //         .withContext('should return the board')
  //         .toEqual(boardsMock[0].id),
  //       error: fail
  //     });

  //     const req = httpTestingController.expectOne(url);
  //     expect(req.request.method).toEqual('DELETE');

  //     req.flush(boardsMock[0]);
  //   });
  // });

  describe('updateBoard', () => {
    beforeEach(() => {
      service = TestBed.inject(BoardsService);
    });

    it('should patch board', () => {
      const id = 'd8568642-6dbd-4135-a1ba-0ebd9f1f9a54';
      const url = `http://localhost:3000/boards/${id}`;

      const board = {
        id: 'd8568642-6dbd-4135-a1ba-0ebd9f1f9a54',
        userId: 1,
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
});
