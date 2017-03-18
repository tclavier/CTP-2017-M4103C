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
    it('freeCell should return one random free cell around (line, column)', () => {
      assert.equal(2, ctp.freeCell(default_world, 1, 1).length);
    });
  });

  describe('Q6', () => {
    it('addFish must add element in fich list', () => {
      var fishes = [];
      assert.equal(1, ctp.addFish(default_world, fishes).length);
    });
    it('addFish must create fish', () => {
      var fishes = [];
      assert.equal(true, ctp.addFish(default_world, fishes)[0] instanceof ctp.Fish);
    });
    it('addFish must create entity in random position', () => {
      var fishes = [];
      const new_fish = ctp.addFish(default_world, fishes)[0];
      const fish_pos = new_fish.getPosition();
      assert.equal(true, ctp.valide(default_world, fish_pos[0], fish_pos[1]));
    });
  });

  describe('Q7', () => {
    it('moveFish should move fish to new position', () => {
      const fish = new ctp.Fish(0,0);
      var world = [[fish, undefined],
                   [undefined, undefined]];
      const old_position = fish.getPosition();
      ctp.moveFish(world, fish);
      const new_position = fish.getPosition();
      assert.equal(false, JSON.stringify(old_position) == JSON.stringify(new_position));
    });
    it('moveFish should move fish in world', () => {
      const fish = new ctp.Fish(0,0);
      var world = [[fish, undefined],
                   [undefined, undefined]];
      const old_position = fish.getPosition();
      ctp.moveFish(world, fish);
      const new_position = fish.getPosition();
      assert.equal(undefined, ctp.getElementInPosition(world, old_position));
      assert.equal(fish, ctp.getElementInPosition(world, new_position));
    });
    it('addFish should register fish in world', () => {
      var fishes = [];
      var world = [[undefined, undefined],
                   [undefined, undefined]];
      const new_fish = ctp.addFish(world, fishes)[0];
      const fish_pos = new_fish.getPosition();
      assert.equal(new_fish, ctp.getElementInPosition(world, fish_pos));
    });
    it('moveAllFish should move all fish in world', () => {
      var world = [[undefined, undefined],
                   [undefined, undefined]];
      var fishes = [];
      ctp.addFish(world, fishes);
      const fish = fishes[0];
      const old_pos = fish.getPosition();
      ctp.moveAllFish(world, fishes);
      const new_pos = fish.getPosition();
      assert.equal(false, JSON.stringify(old_pos) == JSON.stringify(new_pos));
    });
  });
  describe('Q9', () => {
    it('Fish should have a getSymbol function', () => {
      const fish = new ctp.Fish(0,0);
      assert.equal("P", fish.getSymbol());
    });
    it('Shark should have a getSymbol function', () => {
      const fish = new ctp.Shark(0,0);
      assert.equal("S", fish.getSymbol());
    });
  });
  describe('Q10', () => {
    it('buildHtmlTable should generate a html table with P for fish cell', () => {
      const fish = new ctp.Fish(0,0);
      var world = [[fish, undefined],
                   [undefined, undefined]];
      assert.equal("P", ctp.buildHtmlTable(world).rows[0].cells[0].innerHTML);
    });
    it('buildHtmlTable should generate a html table with S for shark cell', () => {
      const fish = new ctp.Shark(0,0);
      var world = [[fish, undefined],
                   [undefined, undefined]];
      assert.equal("S", ctp.buildHtmlTable(world).rows[0].cells[0].innerHTML);
    });
  });
  describe('Q11', () => {
    it('moveFish should stay fish in place when no free cell around', () => {
      const fish00 = new ctp.Shark(0,0);
      const fish01 = new ctp.Shark(0,1);
      const fish10 = new ctp.Shark(1,0);
      const fish11 = new ctp.Shark(1,1);
      var world = [[fish00, fish01],
                   [fish10, fish11]];
      ctp.moveFish(world, fish00);
      assert.equal("[0,0]", JSON.stringify(fish00.getPosition()));
    });
    it('addFish should not add fish when no free cell', () => {
      const fish00 = new ctp.Shark(0,0);
      const fish01 = new ctp.Shark(0,1);
      const fish10 = new ctp.Shark(1,0);
      const fish11 = new ctp.Shark(1,1);
      var world = [[fish00, fish01],
                   [fish10, fish11]];
      var fishes = [fish00, fish01, fish10, fish11];
      ctp.addFish(world, fishes)
      assert.equal(4, fishes.length);
    });
  });
});
