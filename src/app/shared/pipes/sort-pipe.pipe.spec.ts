import { boardsMock } from 'src/mocks/boards-mock';
import { SearchPipe } from './search.pipe';
import { SortPipePipe } from './sort-pipe.pipe';

describe('SortPipePipe', () => {
  
  let pipe: SearchPipe;

  beforeEach(() => {
    pipe = new SearchPipe();
  })

  it('create an instance', () => {
    const pipe = new SortPipePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return boards with word "board"', () => {
    const property = 'board';
    expect(pipe.transform(boardsMock, property)).toEqual(boardsMock);
  });
});
