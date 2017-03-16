const ctp = require('ctp');
const assert = require('assert');

describe('Q1', () => {
  it('createWorld should create world map initialised by Undefined', () => {
    assert.equal(undefined, ctp.createWorld(2, 2)[1][1]);
  });
  it('createWorld should create world map with good lines number', () => {
    assert.equal(2, ctp.createWorld(2, 2).length );
  });
  it('createWorld should create world map with good column number', () => {
    assert.equal(2, ctp.createWorld(2, 2)[0].length );
  });
});
