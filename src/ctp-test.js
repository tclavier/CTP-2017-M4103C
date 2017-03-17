const ctp = require('ctp');
var jsdom = require("jsdom");
var document = jsdom.jsdom(undefined);
global.document = document;
const assert = require('assert');

describe('Control TP', () => {
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

  describe('Q2', () => {
    it('buildHtmlTable should generate a html table with u for undefined cell', () => {
      const world = [[undefined, undefined],
                     [undefined, undefined]];
      assert.equal("u", ctp.buildHtmlTable(world).rows[1].cells[1].innerHTML);
    });
    it('buildHtmlTable should generate a html table with good line number', () => {
      const world = [[undefined, undefined],
                     [undefined, undefined]];
      assert.equal(2, ctp.buildHtmlTable(world).rows.length);
    });

  });
});
