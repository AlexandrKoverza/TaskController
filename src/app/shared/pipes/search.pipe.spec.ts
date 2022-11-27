import { boardsMock } from 'src/mocks/boards-mock';
import { SearchPipe } from './search.pipe';

describe('SearchPipe', () => {
  let pipe: SearchPipe;

  beforeEach(() => {
    pipe = new SearchPipe();
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  xit('should return all array', () => {
    const property = '';
    expect(pipe.transform(boardsMock, property)).toEqual(boardsMock);
  });

  xit('should return item which contains "second" in array', () => {
    const property = 'second';
    expect(pipe.transform(boardsMock, property)).toEqual([boardsMock[1]]);
  });

  xit('should return empty array', () => {
    const property = 'g54g354';
    expect(pipe.transform(boardsMock, property)).toEqual([]);
  });
});
