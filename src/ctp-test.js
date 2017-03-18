const ctp = require('ctp');
var jsdom = require("jsdom");
var document = jsdom.jsdom(undefined);
global.document = document;
const assert = require('assert');

const default_world = [[undefined, undefined],
                       [undefined, undefined]];

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
    xit('buildHtmlTable should generate a html table with u for undefined cell', () => {
      assert.equal("u", ctp.buildHtmlTable(default_world).rows[1].cells[1].innerHTML);
    });
    it('buildHtmlTable should generate a html table with good line number', () => {
      assert.equal(2, ctp.buildHtmlTable(default_world).rows.length);
    });
    it('buildHtmlTable should generate a html table with line and column in id', () => {
      assert.equal("1_0", ctp.buildHtmlTable(default_world).rows[1].cells[0].id);

    });
  });
  describe('Q3', () => {
    it('buildHtmlTable should generate a html table with ~ for undefined cell', () => {
      assert.equal("~", ctp.buildHtmlTable(default_world).rows[1].cells[1].innerHTML);
    });
  });
  describe('Q4', () => {
    it('valide should return true if point is in world', () => {
      assert.equal(true, ctp.valide(default_world, 1, 1));
    });
    it('valide should return false if point is out of world', () => {
      assert.equal(false, ctp.valide(default_world, -1, 1));
      assert.equal(false, ctp.valide(default_world, 2, 1));
      assert.equal(false, ctp.valide(default_world, 1, 4));
      assert.equal(false, ctp.valide(default_world, 0, -1));
      assert.equal(false, ctp.valide(default_world, 0, 2));
    });
  });
  describe('Q5', () => {
    it('freeCells should return all free cell around (line, column)', () => {
      assert.equal(3, ctp.freeCells(default_world, 1, 1).length);
    });
  });
});
