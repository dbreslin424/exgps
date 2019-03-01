const exgps = require('./exgps');
jest.mock('./modules');

console.log = jest.fn();

describe('exgps main functionality', () => {
  it('should throw an error if no file is provided', () => {
    expect(() => {
      exgps();
    }).toThrow();
  });
});
